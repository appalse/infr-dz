const express = require('express');
const {PORT, URL_AGENT_BUILD} = require('./src/constants');
const {runBuild} = require('./src/runBuild');
const {notifyAgent} = require('./src/notifyAgent');

// Express.js
const app = express();
app.use(express.json());

app.post(URL_AGENT_BUILD, runBuild);

notifyAgent();
app.listen(PORT);
console.log(`Build-agent is listening on localhost:${PORT}`);
