import dotenv from 'dotenv';
import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';
export default { getAnswer };

dotenv.config();
const apiKey = process.env.PALM_API_KEY || '';

// Define the model name
const modelName = 'models/text-bison-001';

// Create a TextServiceClient instance with authentication
const palm = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(apiKey),
});

// Constant for labeling code in the prompt
const CODE_LABEL = 'Here is the code:';



// Function to generate text using the OpenAI API
async function generateText(prompt: string) {
    try {
        // Make an asynchronous call to the OpenAI API to generate text based on the provided prompt
        const result = await palm.generateText({
            model: modelName,
            prompt: { text: prompt },
        });


        const answer = result?.[0]?.candidates?.[0]?.output;

        if (answer !== undefined) {
            return answer;
        } else {
            // Handle the case where one of the properties is null or undefined
            console.error('The AI is not able to read the file content.');
        }

    } catch (error) {
        // Handle errors during the API call and throw a custom error message
        throw new Error(`Failed to generate text: ${error.message}`);
    }
}

// Main function to get an answer based on code, prompt, and question labels
export async function getAnswer(code: any, PROMPT: any, QUESTION_LABEL: any) {
    try {
        // Build the full prompt by combining the provided prompt, code, and question label
        const fullPrompt = buildFullPrompt(code, PROMPT, QUESTION_LABEL);

        // Use the generateText function to get an answer based on the constructed prompt
        const answer = await generateText(fullPrompt);

        // Return the generated answer
        return answer;
    } catch (error) {
        // Handle errors during the process and throw a custom error message
        throw new Error(`Failed to get explanation: ${error.message}`);
    }
}

// Helper function to construct the full prompt with code, prompt, and question label
function buildFullPrompt(code: any, PROMPT: any, QUESTION_LABEL: any) {
    return `${PROMPT}
            ${CODE_LABEL}
            ${code}
            ${QUESTION_LABEL}`;
}
