import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { RecordsModule } from '../records/records.module';
import { HistoriesModule } from '../histories/histories.module';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [RecordsModule, HistoriesModule],
  exports: [TestService],
})
export class TestModule {}
