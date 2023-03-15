# nsh - Natural Language Shell 🗣️ 🖥️ 
__nsh__  is an open source project that allows you to use natural language to execute terminal commands.

## 🛠️ Installation
To install the app, follow these steps:

1. Clone the repository: git clone https://github.com/nikodem-wrona/nsh.git
2. Navigate to the scripts directory: `cd nsh/scripts`
3. Run the install script: `./install.sh`
4. The app will be installed in `/Users/$USER/nsh`

It will build the app and copy the necessary files and dependencies to the installation directory.

App needs a api key to work. You can get one [here](https://platform.openai.com/account/api-keys). It reads the key from from an environment variable called `OPEN_AI_API_KEY`. You can set it by running the following command:

```bash
export OPEN_AI_API_KEY=<your_api_key>
```

## ⌨️ Usage
Once you have installed the app, you can start using it to execute terminal commands using natural language.

To start the app, run the following command:

```bash
node /Users/$USER/nsh/nsh/index.js
```

The app will prompt you to enter a command.

Here are some examples of the types of commands you can execute:

- Create a new directory called 'mydir'

- List all files in the current directory
- Remove the file 'myfile.txt'
- Move the file 'myfile.txt' to the directory 'mydir'
- Rename the file 'oldname.txt' to 'newname.txt'

❗❗❗ __CAUTION:__ Commands are automatically executed without any confirmation. Use it carefully.

The app uses `gpt-3.5-turbo` model from OpenAI to generate the commands.

## 🔥 Uninstallation
To uninstall the app, follow these steps:

1. Navigate to the scripts directory: `cd nsh/scripts`
2. Run the uninstall script: `./uninstall.sh`

The app will be removed from your system.
The uninstall script will remove the `nsh` directory from your home directory and all its contents.

## 👨‍💻 Contributing
Contributions from anyone who is interested in improving this app are really welcomed! If you would like to contribute, please follow these steps:

Fork the repository

1. Create a new branch for your changes: `git checkout -b my-new-feature`
2. Make your changes and commit them: `git commit -am 'add some feature'`
3. Push your changes to your fork: `git push origin my-new-feature`
4. Submit a pull request

Please make sure that your code is well-documented and that you have added tests for any new functionality.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Other

__PS:__ Thanks to [adam-golab](https://github.com/adam-golab) for the idea how to name the app.
