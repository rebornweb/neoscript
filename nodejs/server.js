'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// Express install
// npm install express --save
// npm install nodemon --save-dev
// From package json run script start
// npm run start 

//touch .gitignore && echo "node_modules/" >> .gitignore && git rm -r --cached node_modules ; git status