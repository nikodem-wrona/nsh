import readline from "readline";
import { exec } from 'child_process';

import { OpenAIClient } from './OpenAI.client';

export class CommandExecutor {
  private openAiClient: OpenAIClient;
  private readLineInterface: readline.Interface;
  private message: string = 'Enter input (or "exit" to stop): ';

  constructor(openAiClient: OpenAIClient) {
    this.openAiClient = openAiClient;
    this.readLineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  private AskForInput(): void {
    this.readLineInterface.question(
       this.message,
      (answer) => {
        if (answer === "exit") {
          this.readLineInterface.close()
          return
        }
  
        this.openAiClient.GenerateCommand(answer).then((command) => {
          if (!command) {
            this.AskForInput()
            return
          }

          console.log(`Executing command: ${command}`)

          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing command: ${error}`)
              this.AskForInput()
              return
            }
    
            console.log(`Output:\n${stdout}`)
            this.AskForInput()
          })
        });
      }
    )
  }

  public async Start(): Promise<void> {
    this.AskForInput();
  }
}
