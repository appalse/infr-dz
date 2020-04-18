const path = require('path');
const express = require('express');

// Express.js
const app = express();
app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204));

const PORT = 3002;
app.listen(PORT);
console.log('Build-agent is listening on localhost:${PORT}');