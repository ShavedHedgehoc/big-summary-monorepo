import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PUBLIC_API_PORT || 3000;
  const app = await NestFactory.create(AppModule, { logger: ['error'] });

  const mainOption = new DocumentBuilder()
    .setTitle('Public API')
    .setDescription('API for summary list database')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const mainFactory = SwaggerModule.createDocument(app, mainOption);
  SwaggerModule.setup('/documentation', app, mainFactory);

  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));
  await app.listen(PORT, () => console.log(`API started on ${PORT}`));
}
bootstrap().catch((err) => {
  console.error('Error starting application:', err);
  process.exit(1);
});
