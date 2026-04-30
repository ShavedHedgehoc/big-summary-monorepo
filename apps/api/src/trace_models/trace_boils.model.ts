import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

import TraceBatch from './trace_batch.model';
import TraceProduct from './trace_product.model';

@Table({ tableName: 'Boils' })
export default class TraceBoil extends Model {
  @PrimaryKey
  @Column
  BoilPK!: number;

  @ForeignKey(() => TraceBatch)
  @Column
  BatchPK!: number;

  @ForeignKey(() => TraceProduct)
  @Column
  ProductId!: number;

  @Column
  Quantity!: number;

  @BelongsTo(() => TraceBatch)
  batch!: TraceBatch;

  @BelongsTo(() => TraceProduct)
  product!: TraceProduct;
}
