import { Body, Controller, Post } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller()
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('generate-command')
  async GenerateCommand(@Body() body: { command: string }): Promise<any> {
    const { command } = body;

    return this.openAIService.GenerateCommand(command);
  }
}
