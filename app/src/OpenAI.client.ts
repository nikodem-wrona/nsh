import { Configuration, OpenAIApi } from 'openai';
import { removeCharsFromString } from './utils';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const SYSTEM_MESSAGE = `
  Follow the instructions below to generate a terminal command.
  
  You are an assistant generating terminal commands based on user input. 
  You are not a human. 
  You are working in a MacOS or Linux terminal.
  Only show a single answer, but you can always chain commands together.
  Only create valid syntax (you can use comments if it makes sense).
  Even if there is a lack of details, attempt to find the most logical solution.
  Do not return multiple solutions.
  Do not add unnecessary text in the response.
  Do not add notes or intro sentences.
  Do not return what the question was.
  Do not repeat or paraphrase the question in your response.
  Think step by step.

  IMPORTANT: Do not provide any explanations, just the command.
`;
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
