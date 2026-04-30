import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

import TraceCanRecord from './trace_can_record.model';
import TraceCanLocation from './trace_can_location.model';

@Table({ tableName: 'Cans' })
export default class TraceCan extends Model {
  @PrimaryKey
  @Column
  CanPK!: number;

  @Column
  CanName!: string;

  @Column
  CanVolume!: number;

  @Column
  CanBarcode!: string;

  @Column
  CanOrderValue!: string;

  @HasMany(() => TraceCanRecord)
  can_records!: TraceCanRecord[];

  @HasMany(() => TraceCanLocation)
  locations!: TraceCanLocation[];
}
