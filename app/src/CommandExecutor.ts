import readline from "readline";
import { exec } from "child_process";

import { OpenAIClient } from "./OpenAI.client";

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

  private AskForConfirmation(generatedCommand: string): void {
    console.log(`\nGenerated command: \n\n$ ${generatedCommand}\n`);

    this.readLineInterface.question(
      "Are you sure you want to execute generated command? (y/n) ",
      (answer) => {
        if (answer === "y") {
          exec(generatedCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing command: ${error}`);
              this.AskForInput();
              return;
            }

            console.log(`\nOutput:\n\n$ ${stdout}`);
            this.AskForInput();
          });
        } else {
          console.log('Aborted.\n');
          this.AskForInput();
        }
      }
    );
  }

  private AskForInput(): void {
    this.readLineInterface.question(this.message, (answer) => {
      if (answer === "exit") {
        this.readLineInterface.close();
        return;
      }

      this.openAiClient.GenerateCommand(answer).then((command) => {
        if (!command) {
          this.AskForInput();
          return;
        }

        this.AskForConfirmation(command);
      });
    });
  }

  public async Start(): Promise<void> {
    this.AskForInput();
  }
}
