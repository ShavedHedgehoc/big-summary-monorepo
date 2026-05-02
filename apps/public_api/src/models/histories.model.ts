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
import Record from './records.model';
import Boil from './boil.model';
import HistoryType from './history_types.model';
import User from './users.model';
import Employee from './employees.model';
import Note from './notes.model';
import Plant from './plant.model';

interface HistoriesCreationsAttrs {
  record_id: number;
  boil_id: number | null;
  historyTypeId: number;
  userId: number | null;
  employeeId: number | null;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'histories' })
export default class History extends Model<History, HistoriesCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id записи' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id!: number;

  @ApiProperty({ example: '1', description: 'id строки сводки' })
  @ForeignKey(() => Record)
  @Column({ type: DataType.NUMBER })
  record_id!: number;

  @ApiProperty({ example: '1', description: 'id партии' })
  @ForeignKey(() => Boil)
  @Column({ type: DataType.NUMBER })
  boil_id!: number;

  @ApiProperty({ example: '1', description: 'id типа записи' })
  @ForeignKey(() => HistoryType)
  @Column({ type: DataType.NUMBER })
  historyTypeId!: number;

  @ApiProperty({ example: '1', description: 'id пользователя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.NUMBER })
  userId!: number;

  @ApiProperty({ example: '1', description: 'id пользователя рабочей станции' })
  @ForeignKey(() => Employee)
  @Column({ type: DataType.NUMBER })
  employeeId!: number;

  @ApiProperty({ example: 'Комментарий к записи', description: 'Комментарий к записи' })
  @Column({ type: DataType.STRING })
  note!: string;

  @ApiProperty({ example: '1', description: 'id пользователя рабочей станции' })
  @ForeignKey(() => Note)
  @Column({ type: DataType.NUMBER })
  note_id!: number;

  @ForeignKey(() => Plant)
  @Column({ type: DataType.NUMBER })
  plant_id!: number;

  @BelongsTo(() => Record)
  record!: Record;

  @BelongsTo(() => Boil)
  boil!: Boil;

  @BelongsTo(() => HistoryType)
  historyType!: HistoryType;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Employee)
  employee!: Employee;

  @BelongsTo(() => Note)
  history_note!: Note;

  @BelongsTo(() => Plant)
  plant!: Plant;
}
