import { Module } from '@nestjs/common';
import { DocsListController } from './docs.list.controller';
import { DocsListService } from './docs.list.service';
import { RecordsModule } from '../records/records.module';
import { DocsModule } from '../docs/docs.module';
import { HistoriesModule } from '../histories/histories.module';

@Module({
  controllers: [DocsListController],
  providers: [DocsListService],
  imports: [RecordsModule, DocsModule, HistoriesModule],
})
export class DocsListModule {}
