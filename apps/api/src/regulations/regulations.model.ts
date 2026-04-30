import { ApiProperty } from '@nestjs/swagger';
import {
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
import Product from '../products/products.model';

interface RegulationCreationsAttrs {
  product_id: number;
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
}

@Table({ tableName: 'regulations' })
export default class Regulation extends Model<Regulation, RegulationCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id строки' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id!: number;

  @ForeignKey(() => Product)
  @Column
  product_id!: number;

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
    type: DataType.INTEGER,
    allowNull: true,
  })
  marking_sample_id!: number | null;

  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => MarkingSample)
  marking_sample!: MarkingSample;
}
