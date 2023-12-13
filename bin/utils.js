import dotenv from 'dotenv'
import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

dotenv.config();
export default { getAnswer };

const apiKey = process.env.OPENAI_API_KEY || '';
if (!apiKey) {
    console.error('API key not configured.');
}

const modelName = 'models/text-bison-001';

const palm = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(apiKey),
});

const CODE_LABEL = 'Here is the code:';

export async function getAnswer(code, PROMPT, QUESTION_LABEL) {
    try {
        // Build the full prompt using the template.
        const fullPrompt = `${PROMPT}
                            ${CODE_LABEL}
                            ${JSON.stringify(code)}
                            ${QUESTION_LABEL}
                            `;
        const result = await palm
            .generateText({
                model: modelName,
                prompt: {
                    text: fullPrompt,
                },
            });

        let answer = result[0].candidates[0].output;
        return answer;
    } catch (error) {
        throw new Error(`Failed to get explanation: ${error.message} `);
    }
}


