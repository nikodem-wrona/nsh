import { CommandExecutor } from './CommandExecutor';
import { HttpClient } from './Http.client';
import { OpenAIClient } from './OpenAI.client';
import { displayWelcomeMessage } from './utils';

require('dotenv').config();

class App {
    async run() {
      displayWelcomeMessage();
      
      const url = process.env.NSH_API_URL || '';
      const authToken = process.env.NSH_AUTH_TOKEN || '';

      const httpClient = new HttpClient(url, {
        'Authorization': `Bearer ${authToken}`,
      });

      const openAIClient = new OpenAIClient(httpClient);
      const commandExecutor = new CommandExecutor(openAIClient);

      await commandExecutor.Start();
    }
}

const app = new App();
void app.run();
