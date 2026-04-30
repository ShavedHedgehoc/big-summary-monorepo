import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import AppModule from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TraceBatchModule } from './trace_batch/trace_batch.module';
import { TraceWeightingsModule } from './trace_weightings/trace_weightings.module';
import { TraceLoadsModule } from './trace_loads/trace_loads.module';
import { TraceTechnologyModule } from './trace_technology/trace_technology.module';
import { TraceInventoryDocsModule } from './trace_inventory_docs/trace_inventory_docs.module';
import { TraceInventoryRowsModule } from './trace_inventory_rows/trace_inventory_rows.module';
import { TraceTrademarksModule } from './trace_trademarks/trace_trademarks.module';
import cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.API_PORT || 5000;
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  app.setGlobalPrefix('api');

  const mainOption = new DocumentBuilder()
    .setTitle('Summary API')
    .setDescription('API for summary list database')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const mainFactory = SwaggerModule.createDocument(app, mainOption);
  SwaggerModule.setup('/api/documentation/main', app, mainFactory);

  const traceOption = new DocumentBuilder()
    .setTitle('Trace API')
    .setDescription('API for trace database')
    .setVersion('1.0')
    .addTag('Trace API')
    .build();

  const traceFactory = SwaggerModule.createDocument(app, traceOption, {
    include: [
      TraceBatchModule,
      TraceWeightingsModule,
      TraceLoadsModule,
      TraceTechnologyModule,
      TraceInventoryDocsModule,
      TraceInventoryRowsModule,
      TraceTrademarksModule,
    ],
  });
  SwaggerModule.setup('/api/documentation/trace', app, traceFactory);

  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}

start().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
