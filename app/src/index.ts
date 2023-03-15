import { CommandExecutor } from './CommandExecutor';
import { OpenAIClient } from './OpenAI.client';
import { displayWelcomeMessage } from './utils';

require('dotenv').config();

class App {
    async run() {
      displayWelcomeMessage();
      
      const apiKey = process.env.OPEN_AI_API_KEY || '';

      const openAIClient = new OpenAIClient(apiKey);
      const commandExecutor = new CommandExecutor(openAIClient);

      await commandExecutor.Start();
    }
}

const app = new App();
void app.run();
