const REVIEW_LABEL = 'Here is the review of the code:';
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

export default REVIEW_PROMPT;