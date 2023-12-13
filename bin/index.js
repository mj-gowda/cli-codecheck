#! /usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import utils from './utils.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

const yourFile = argv._[0] || 'index.js';

const REVIEW_LABEL = 'Here is the review of the code:';
const EXPLAIN_LABEL = 'Here is the explanation of the code:';
const CODE_LABEL = 'Here is the code:';



const REVIEW_PROMPT = `
Reviewing code involves finding bugs and increasing code quality. Examples of bugs are syntax 
errors or typos, out of memory errors, and boundary value errors. Increasing code quality 
entails reducing complexity of code, eliminating duplicate code, and ensuring other developers 
are able to understand the code. 
Examples :
${CODE_LABEL}
for i in x:
    pint(f"Iteration {i} provides this {x**2}.")
${REVIEW_LABEL}
The command \`print\` is spelled incorrectly.
${CODE_LABEL}
height = [1, 2, 3, 4, 5]
w = [6, 7, 8, 9, 10]
${REVIEW_LABEL}
The variable name \`w\` seems vague. Did you mean \`width\` or \`weight\`?
${CODE_LABEL}
while i < 0:
  thrice = i * 3
  thrice = i * 3
  twice = i * 2
${REVIEW_LABEL}
There are duplicate lines of code in this control structure.
are able to understand the code. `;


const EXPLAIN_PROMPT = `
Explaining code involves breaking down the logic, identifying key concepts, and ensuring clarity. 
Provide detailed explanations for each code snippet.
Examples :
${CODE_LABEL}
for i in x:
    pint(f"Iteration {i} provides this {x**2}.")
${EXPLAIN_LABEL}
This code snippet uses a 'for' loop to iterate over elements in 'x' and prints the square of each element.
${CODE_LABEL}
height = [1, 2, 3, 4, 5]
w = [6, 7, 8, 9, 10]
${EXPLAIN_LABEL}
Here, two lists 'height' and 'w' are defined. They likely represent the height and width of something.
${CODE_LABEL}
while i < 0:
  thrice = i * 3
  thrice = i * 3
  twice = i * 2
${EXPLAIN_LABEL}
This 'while' loop appears to have an issue as the condition 'i < 0' might result in an infinite loop. 
Also, there are duplicate lines inside the loop.
`;

async function run() {
    try {
        const currentFilePath = path.join(process.cwd(), yourFile);
        const resolvedPath = path.resolve(currentFilePath);
        const fullCode = await fs.readFile(resolvedPath, 'utf-8');

        // Limit the code size to 7500 tokens
        const maxTokens = 7500;
        const limitedCode = fullCode.substring(0, maxTokens);
        return limitedCode;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function askQuestion() {
    const answers = await inquirer.prompt({
        name: 'AI_Coding_Assistant',
        type: 'list',
        message: 'What do you wish to do with the code in your current file.\n',
        choices: ['code-review', 'explain-code'],
    });

    return handleAnswer(answers.AI_Coding_Assistant);
}

async function handleAnswer(choice) {
    const code = await run();
    if (choice === 'code-review') {
        const review = await utils.getAnswer(code, REVIEW_PROMPT, REVIEW_LABEL);
        console.log("The code review :\n");
        console.log(review);

    } else {
        const explain = await utils.getAnswer(code, EXPLAIN_PROMPT, EXPLAIN_LABEL);
        console.log("The code explanation :\n");
        console.log(explain);
    }
}


console.clear();
await askQuestion();




