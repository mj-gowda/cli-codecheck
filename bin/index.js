#! /usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import utils from './utils.js';
import REVIEW_PROMPT from '../models/reviewPrompt.js';
import EXPLAIN_PROMPT from '../models/explainPrompt.js';

const REVIEW_LABEL = 'Here is the review of the code:';
const EXPLAIN_LABEL = 'Here is the explanation of the code:';

async function run(yourFile) {
    try {
        const currentFilePath = process.cwd();
        const resolvedPath = path.join(currentFilePath, yourFile);
        const fullCode = await fs.readFile(resolvedPath, 'utf-8');

        // Limit the code size to 7500 tokens
        const maxTokens = 7500;
        const limitedCode = fullCode.substring(0, maxTokens);
        return limitedCode;
    } catch (error) {
        console.error('Error:', error.message);
        return 1;
    }
}

async function askQuestion() {
    const answers = await inquirer.prompt({
        name: 'AI_Coding_Assistant',
        type: 'list',
        message: 'What do you wish to do with the code in your current file.\n',
        choices: ['code-review', 'explain-code'],
    });

    return answers.AI_Coding_Assistant;
}

async function handleAnswer(choice, code) {
    const config = {
        'code-review': { prompt: REVIEW_PROMPT, label: REVIEW_LABEL },
        'explain-code': { prompt: EXPLAIN_PROMPT, label: EXPLAIN_LABEL },
    };

    const selectedConfig = config[choice];

    if (selectedConfig) {
        const answer = await utils.getAnswer(code, selectedConfig.prompt, selectedConfig.label);
        console.log(`The ${choice}:\n`);
        console.log(answer);
    } else {
        console.error(`Invalid choice: ${choice}`);
    }
}

async function selectFile(files) {
    const choices = files.map(file => ({
        name: file,
        value: file,
    }));

    const answers = await inquirer.prompt({
        name: 'select_file',
        type: 'list',
        message: 'Please select a file and not a folder. The default file selected will be index.js.\n',
        default: 'index.js', // Set the default file name
        choices: [...choices, new inquirer.Separator(), 'Cancel'],
    });

    if (answers.select_file === 'Cancel') {
        process.exit(1);
    }

    return answers.select_file;
}


async function main() {
    try {
        // Replace this with the actual list of files in the directory
        const files = await fs.readdir(process.cwd());
        let yourFile;
        if (files) {
            yourFile = await selectFile(files);
        } else {
            process.exit('Empty directory')
        }
        console.log('Selected File:', yourFile);

        const code = await run(yourFile);
        if (code === 1) {
            console.log("Please enter the correct path.\n")
        } else {
            const choice = await askQuestion();
            await handleAnswer(choice, code);
        }
    } catch (error) {

        console.error('An unexpected error occurred:', error.message);
        process.exit(1); // Exit the program with an error status
    }
}


// Main function calls
console.clear();
main();





