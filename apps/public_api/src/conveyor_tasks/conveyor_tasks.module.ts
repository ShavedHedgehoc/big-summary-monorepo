import { Module } from '@nestjs/common';
import { ConveyorTasksController } from './conveyor_tasks.controller';
import { ConveyorsModule } from '../conveyors/conveyors.module';

@Module({
  controllers: [ConveyorTasksController],
  imports: [ConveyorsModule],
})
export class ConveyorTasksModule {}
