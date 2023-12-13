<h1 align="center">
  CODECHECK 
 </h1>
 <br>
<p align="center">A CLI to get your own AI coding assistant who can review and explain any code you want.</p>
<br>

<p align="center">
<img src="images/demo.gif" alt="demonstration" height="500" width="800" >  
</p>


---

## Usage

```
~$ codecheck /bin/index.js
Usage: codecheck <file path>
```
#### The default file name will be index.js if just codecheck is called

> :warning: **Please be aware that the file content will be accessed by a thrid party api.(google palm api)**

<br>

## Installation

1. Clone the repository and then navigate to it.
2. Run ```npm install``` to install the dependencies.
3. Run ```npm install -g .``` to install the CLI. <br>

> :warning: **This might cause an error** which can be resolved easily by using ```sudo``` with the command, **however**, using ```sudo``` with ```npm``` is **not recommended** because it might cause permission issues later. So instead put the code below in your .bashrc file and then run the above command again.
```
npm set prefix ~/.npm
PATH="$HOME/.npm/bin:$PATH"
PATH="./node_modules/.bin:$PATH"
```
4. Now you are good to go and can use the CLI globally!

Type ```codecheck``` or ```codecheck <file path in cwd>``` to get started.

<br>

## License

MIT © ***termTranslate***
