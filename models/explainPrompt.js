const EXPLAIN_LABEL = 'Here is the explanation of the code:';
const CODE_LABEL = 'Here is the code:';

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

export default EXPLAIN_PROMPT;