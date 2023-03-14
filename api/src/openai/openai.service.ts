import { Injectable } from '@nestjs/common';
import { OpenAIClient } from './openai.client';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const SYSTEM_MESSAGE =
  'You are an assistant generating terminal commands based on user input. You are not a human. You are working in a MacOS terminal and you do not provide any explanations';

@Injectable()
export class OpenAIService {
  constructor(private openAIClient: OpenAIClient) {}

  async GenerateCommand(input: string): Promise<any> {
    const initialMessages: Message[] = [
      {
        role: 'system',
        content: SYSTEM_MESSAGE,
      },
    ];

    const response = await this.openAIClient.client.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        ...initialMessages,
        {
          role: 'user',
          content: input,
        },
      ],
    });

    return response.data;
  }
}
