import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TraceLoad from '../trace_models/trace_loads.model';
import TraceWeighting from '../trace_models/trace_weighting.model';

@Injectable()
export class TraceLoadsService {
  constructor(
    @InjectModel(TraceLoad, 'trace_connection')
    private traceLoadRepository: typeof TraceLoad,
  ) {}

  async parseWeightings(w_item: TraceWeighting, l_item: TraceLoad) {
    const [container, product, lot, document] = await Promise.all([
      l_item.$get('container'),
      w_item.$get('product'),
      w_item.$get('lot'),
      l_item.$get('document'),
    ]);
    if (!lot) throw new HttpException('lot', HttpStatus.NOT_FOUND);
    if (!document) throw new HttpException('doc', HttpStatus.NOT_FOUND);

    const [trademark, user] = await Promise.all([lot.$get('trademark'), document.$get('author')]);

    return {
      id: l_item.LoadsPK,
      product_id: product?.ProductId,
      product_name: product?.ProductName,
      quantity: w_item.Quantity,
      container_id: container?.ContainerPK,
      container_name: container?.ContainerName,
      lot_id: lot.LotPK,
      lot: lot.LotName,
      trademark: trademark ? trademark.TrademarkName : null,
      user: user?.AuthorName,
      date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
    };
  }

  async parseWeightingsForTechnology(w_item: TraceWeighting, l_item: TraceLoad) {
    const product = await w_item.$get('product');
    const lot = await w_item.$get('lot');
    const document = await l_item.$get('document');
    if (!document) throw new HttpException('Document not found', HttpStatus.BAD_REQUEST);
    const user = await document.$get('author');
    return {
      operation_code: product?.ProductId ?? null,
      operation_name: product?.ProductName ?? null,
      quantity: w_item.Quantity,
      lot_name: lot?.LotName ?? null,
      temperature: null,
      user: user?.AuthorName ?? null,
      date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
    };
  }

  async loadResult(item: TraceLoad) {
    const container = await item.$get('container');
    if (!container) throw new HttpException('container', HttpStatus.NOT_FOUND);
    const weightings = await container.$get('weightings');
    return await Promise.all(weightings.map((w_item) => this.parseWeightings(w_item, item)));
  }

  async loadForTechnologyResult(item: TraceLoad) {
    const container = await item.$get('container');
    if (!container) throw new HttpException('container', HttpStatus.NOT_FOUND);
    const weightings = await container.$get('weightings');
    return await Promise.all(
      weightings.map((w_item) => this.parseWeightingsForTechnology(w_item, item)),
    );
  }

  async getLoadsRows(batchPK: number) {
    const loads = await this.traceLoadRepository.findAll<TraceLoad>({
      where: { BatchPK: batchPK },
    });
    const result = await Promise.all(loads.map((item) => this.loadResult(item)));
    return result.flat(1);
  }

  async getLoadsRowsForTechnology(batchPK: number) {
    const loads = await this.traceLoadRepository.findAll<TraceLoad>({
      where: { BatchPK: batchPK },
    });
    const result = await Promise.all(loads.map((item) => this.loadResult(item)));
    return result.flat(1);
  }
}
