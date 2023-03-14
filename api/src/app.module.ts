import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from './config';

import { OpenAIModule } from './openai';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    OpenAIModule,
  ],
  controllers: [],
})
export class AppModule {}
