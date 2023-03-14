import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { OpenAIClient } from './openai.client';
import { OpenAIController } from './openai.controller';
import { OpenAIService } from './openai.service';

@Module({
  imports: [],
  controllers: [OpenAIController],
  providers: [ConfigService, OpenAIClient, OpenAIService],
})
export class OpenAIModule {}
