const path = require('path');
const axios = require('axios');
const https = require('https');
const express = require('express');
const cors = require('cors');

// build api
const api = axios.create({
    baseURL: 'https://hw.shri.yandex/api',
    headers: { Authorization: "Bearer " + process.env.API_TOKEN },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

// Express.js
const app = express();
app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(cors());

const PORT = 3001;
app.listen(PORT);
console.log('Build-server is listening on localhost:${PORT}');