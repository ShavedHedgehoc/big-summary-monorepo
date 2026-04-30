import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Apparatus from '../apparatuses/apparatuses.model';
import Boil from '../boils/boil.model';
import Can from '../cans/cans.model';
import Conveyor from '../conveyors/conveyor.model';
import Doc from '../docs/docs.model';
import History from '../histories/histories.model';
import Product from '../products/products.model';
import RecordCounter from '../record_counters/record_counters.model';
import RecordRegulation from '../record_regulations/record_regulations.model';
import Workshop from '../workshops/workshop.model';

interface RecordsCreationsAttrs {
  productId: number;
  boilId: number | null;
  apparatusId: number | null;
  canId: number | null;
  conveyorId: number;
  plan: number;
  bbf: string;
  note: string;
  workshopId: number;
  water_base_id: number | null;
  organic_base_id: number | null;
}

@Table({ tableName: 'records' })
export default class Record extends Model<Record, RecordsCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id записи' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id!: number;

  @ForeignKey(() => Doc)
  @Column
  doc_id!: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => Boil)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  boilId?: number | null;

  @BelongsTo(() => Boil, 'boilId')
  boil!: Boil;

  @ForeignKey(() => Apparatus)
  @Column
  apparatusId!: number;

  @ForeignKey(() => Can)
  @Column
  canId!: number;

  @ForeignKey(() => Conveyor)
  @Column
  conveyorId!: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  plan!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  bbf!: string;

  @AllowNull(false)
  @Default('-')
  @Column({ type: DataType.STRING })
  dm!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  note!: string;

  @ForeignKey(() => Workshop)
  @Column
  workshopId!: number;

  @ForeignKey(() => Boil)
  @Column
  water_base_id!: number;

  @BelongsTo(() => Boil, 'water_base_id')
  water_base!: Boil;

  @ForeignKey(() => Boil)
  @Column
  organic_base_id!: number;

  @BelongsTo(() => Boil, 'organic_base_id')
  organic_base!: Boil;

  @Default(false)
  @Column
  isSet!: boolean;

  @BelongsTo(() => Doc)
  doc!: Doc;

  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => Apparatus)
  apparatus!: Apparatus;

  @BelongsTo(() => Can)
  can!: Can;

  @BelongsTo(() => Conveyor)
  conveyor!: Conveyor;

  @BelongsTo(() => Workshop)
  workshop!: Workshop;

  @HasMany(() => History)
  histories!: History[];

  @HasOne(() => RecordRegulation)
  record_regulation!: RecordRegulation;

  @HasMany(() => History)
  record_counters!: RecordCounter[];

  @BeforeCreate
  static addSetProperty(instance: Record) {
    const apparatus = instance.apparatusId;
    const can = instance.canId;
    if (can || apparatus) {
      instance.isSet = false;
    } else {
      instance.isSet = true;
    }
  }
}
