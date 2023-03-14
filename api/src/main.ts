import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './shared/auth.guard';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Config>);

  app.enableCors();

  app.useGlobalGuards(new AuthGuard(configService));

  const port = configService.get('PORT');

  await app.listen(port, async () => {
    console.log(`Server started on ${await app.getUrl()}`);
  });
}
bootstrap();
