import dotenv from 'dotenv';
import { displayWelcomeMessage } from './utils';

class App {
    async run() {
      displayWelcomeMessage();
      dotenv.config();
    }
}

const app = new App();
void app.run();
