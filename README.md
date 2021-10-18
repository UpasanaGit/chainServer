## Server Application to get exchange rates for Bitcoin and Etherum using Node

Begining with npm initialization moving to install dependencies and develop accordingly. A index.js file is also there for the config module, consist of API calling function and object creation method according to the requriement from the complete API response.
It was difficult to find the apis first where I can get the required data after that to handle the async-await.

## Commands Executed for dependencies
npm init
npm install node
npm install express
npm install node-fetch

## To Run (http://localhost:8080)
npm start

## Brief Description
1. To get two different price sources used are  - coinApi and nomics
2. API key and URL are there to fetch response for Bitcoin and Etherum
3. Prepare resposne to pass it to the React application on request
4. To make "npm start" work on terminal, make changes in package.json at line number 8
5. To make support for module, add line number 6 in package.json