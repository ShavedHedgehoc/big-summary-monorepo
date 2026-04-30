import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import MarkingSample from '../marking_sample/marking_sample.model';
import Record from '../records/records.model';

interface RecordRegulationCreationsAttrs {
  record_id: number;
  org_base_min_weight: number;
  org_base_max_weight: number;
  water_base_min_weight: number;
  water_base_max_weight: number;
  per_box: number;
  box_per_row: number;
  row_on_pallet: number;
  gasket: string | null;
  seal: boolean;
  technician_note: string | null;
  packaging_note: string | null;
  marking_sample_id: number | null;
  marking_feature: string | null;
  ink_color: string | null;
}

@Table({ tableName: 'record_regulations' })
export default class RecordRegulation extends Model<
  RecordRegulation,
  RecordRegulationCreationsAttrs
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id!: number;

  @ForeignKey(() => Record)
  @Column
  record_id!: number;

  @Column({ type: DataType.DECIMAL })
  org_base_min_weight!: number;

  @Column({ type: DataType.DECIMAL })
  org_base_max_weight!: number;

  @Column({ type: DataType.DECIMAL })
  water_base_min_weight!: number;

  @Column({ type: DataType.DECIMAL })
  water_base_max_weight!: number;

  @Column({ type: DataType.INTEGER })
  per_box!: number;

  @Column({ type: DataType.INTEGER })
  box_per_row!: number;

  @Column({ type: DataType.INTEGER })
  row_on_pallet!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  gasket!: string | null;

  @Column({ type: DataType.BOOLEAN })
  seal!: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  technician_note!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  packaging_note!: string | null;

  @ForeignKey(() => MarkingSample)
  @Column({
    type: DataType.INTEGER, // Явно указываем тип для надежности
    allowNull: true, // Разрешаем NULL в базе данных
  })
  marking_sample_id?: number | null;
  @AllowNull(true)
  @Column({ type: DataType.STRING })
  inc_color!: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  marking_feature?: string;

  @BelongsTo(() => Record)
  record!: Record;

  @BelongsTo(() => MarkingSample)
  marking_sample!: MarkingSample;
}
