import { Configuration, OpenAIApi } from 'openai';
import { removeCharsFromString } from './utils';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const SYSTEM_MESSAGE =
  'You are an assistant generating terminal commands based on user input. You are not a human. You are working in a MacOS terminal and you do not provide any explanations. Do not provide explanations';

export class OpenAIClient {
  private client: OpenAIApi;

  constructor(apiKey: string) {
    const config = new Configuration({
      apiKey,
    });

    this.client = new OpenAIApi(config);
  }

  private ParseCommand(rawCommand: string): string {
    return removeCharsFromString(rawCommand, ['"', '`']);
  }
  
  async GenerateCommand(input: string): Promise<any> {
    const initialMessages: Message[] = [
      {
        role: 'system',
        content: SYSTEM_MESSAGE,
      },
    ];

    const response = await this.client.createChatCompletion({
      model: 'gpt-3.5-turbo',
      
      messages: [
        ...initialMessages,
        {
          role: 'user',
          content: input,
        },
      ],
    });

    const { choices } = response.data;
    const { message } = choices[0];

    if (!message) {
      console.error('Message was null');
      return '';
    }

    const { content } = message;

    return this.ParseCommand(content);
  }
}
