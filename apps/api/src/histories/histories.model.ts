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
import Boil from '../boils/boil.model';
import Employee from '../employees/employees.model';
import HistoryType from '../history_types/history_types.model';
import Note from '../notes/notes.model';
import Plant from '../plants/plant.model';
import Record from '../records/records.model';
import User from '../users/users.model';

interface HistoriesCreationsAttrs {
  record_id: number | null;
  boil_id: number | null;
  historyTypeId: number;
  userId: number;
  employeeId: number;
  note_id: number | null;
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
  @Column
  record_id!: number;

  @ApiProperty({ example: '1', description: 'id партии' })
  @ForeignKey(() => Boil)
  @Column
  boil_id!: number;

  @ApiProperty({ example: '1', description: 'id типа записи' })
  @ForeignKey(() => HistoryType)
  @Column
  historyTypeId!: number;

  @ApiProperty({ example: '1', description: 'id пользователя' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId?: number | null;

  @ApiProperty({ example: '1', description: 'id пользователя рабочей станции' })
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  employeeId?: number | null;

  @ApiProperty({
    example: 'Комментарий к записи',
    description: 'Комментарий к записи',
  })
  @Column({ type: DataType.STRING })
  note!: string;

  @ApiProperty({ example: '1', description: 'id пользователя рабочей станции' })
  @ForeignKey(() => Note)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  note_id?: number | null;

  @ForeignKey(() => Plant)
  @Column
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
