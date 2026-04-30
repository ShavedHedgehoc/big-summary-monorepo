import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TraceWeighting from '../trace_models/trace_weighting.model';

@Injectable()
export class TraceWeightingsService {
  constructor(
    @InjectModel(TraceWeighting, 'trace_connection')
    private traceWeightingRepository: typeof TraceWeighting,
  ) {}

  async weightingResult(item: TraceWeighting) {
    const [product, container, lot, document] = await Promise.all([
      item.$get('product'),
      item.$get('container'),
      item.$get('lot'),
      item.$get('document'),
    ]);

    if (!lot) throw new HttpException('lot', HttpStatus.NOT_FOUND);
    if (!document) throw new HttpException('Document not found', HttpStatus.BAD_REQUEST);

    const [trademark, user] = await Promise.all([lot.$get('trademark'), document.$get('author')]);

    const itemResult = {
      id: item.WeightingsPK,
      product_id: item.ProductId,
      product_name: product?.ProductName ?? null,
      quantity: item.Quantity,
      container_id: container?.ContainerPK ?? null,
      container_name: container?.ContainerName ?? null,
      lot_id: lot.LotPK,
      lot: lot.LotName,
      trademark: trademark ? trademark.TrademarkName : null,
      user: user?.AuthorName ?? null,
      date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
    };

    return itemResult;
  }

  async getWeightingsRows(batchPK: number) {
    const weightings = await this.traceWeightingRepository.findAll<TraceWeighting>({
      where: { BatchPK: batchPK },
    });
    return await Promise.all(weightings.map((item) => this.weightingResult(item)));
  }
}
