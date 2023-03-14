const readline = require("readline")
const { exec } = require("child_process")
const axios = require("axios")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function removeCharsFromString(str) {
  const charsToRemove = ["'", "`"];
  let newStr = str;

  // Remove characters from the beginning of the string
  while (charsToRemove.includes(newStr[0])) {
    newStr = newStr.slice(1);
  }

  // Remove characters from the end of the string
  while (charsToRemove.includes(newStr[newStr.length - 1])) {
    newStr = newStr.slice(0, newStr.length - 1);
  }

  return newStr;
}

const generate_command = async (input) => {

  const data = {
    command: input,
  }

  const headers = {
    "Authorization": "",
    "x-api-key": "",
    "x-source": ""
  }

  const result = await axios.post("http://localhost:3003/generate-command", data, { headers });
  return result.data;
}

function ask() {
  rl.question(
    'Enter input (or "exit" to stop): ',
    (answer) => {
      if (answer === "exit") {
        rl.close()
        return
      }


      generate_command(answer).then((res) => {
        const output = res.choices[0]
        const command = removeCharsFromString(output.message.content)

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing command: ${error}`)
            ask()
            return
          }
  
          console.log(`Output:\n${stdout}`)
          ask()
        })
      });
    }
  )
}

ask()
