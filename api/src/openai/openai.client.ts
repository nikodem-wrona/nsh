import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAIClient implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  public client: OpenAIApi;

  async onModuleInit(): Promise<void> {
    const config = new Configuration({
      apiKey: this.configService.get('OPEN_AI_API_KEY'),
    });

    this.client = new OpenAIApi(config);
  }
}
