import { Configuration, OpenAIApi } from 'openai';
import { removeCharsFromString } from './utils';
import { createPrompt } from './prompts';

const MODEL = 'gpt-3.5-turbo-0613';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};


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
    const prompt = createPrompt({
      system: 'MacOS',
    });


    const initialMessages: Message[] = [
      {
        role: 'system',
        content: prompt,
      },
    ];

    const response = await this.client.createChatCompletion({
      model: MODEL,
      
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

    if (!content) {
      console.error('Content was null');
      return '';
    }

    return this.ParseCommand(content);
  }
}
