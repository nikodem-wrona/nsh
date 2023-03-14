import { HttpClient } from './Http.client';
import { removeCharsFromString } from './utils';

type Choice = {
  message: {
    content: string;
  }
}

type OpenApiResponse = {
  choices: Choice[]
}

type OpenApiPayload = {
  command: string;
}

export class OpenAIClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private ParseCommand(rawCommand: string): string {
    return removeCharsFromString(rawCommand, ['"', '`']);
  }

  public async GenerateCommand(input: string): Promise<string> {
    const payload: OpenApiPayload = {
      command: input,
    }

    const response = await this.httpClient.Post<OpenApiResponse, OpenApiPayload>(payload);

    if (response === null) {
      console.error('Response was null');
      return '';
    }

    const { choices } = response;

    if (choices.length === 0) {
      console.error('Choices array was empty');
      return '';
    }
    
    const { message } = choices[0];

    if (message === null) {
      console.error('Message was null');
      return '';
    }

    const { content } = message;

    return this.ParseCommand(content);
  }
}
