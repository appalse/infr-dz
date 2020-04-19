const {makeResponse} = require('./utils');
const axios = require('axios');
const https = require('https');
const { API_BASE_URL, API_TOKEN,
        URL_API_BUILD_FINISH} = require('./constants');
const {printError} = require('./utils');

// build api
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: "Bearer " + API_TOKEN },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
});        

// сохранить результаты сборки. В параметрах — id сборки, статус, лог (stdout и stderr процесса).
async function notifyBuildResult(req, res) {
    console.log('POST /notify-build-result');
    try {
        if (req.body && req.body.buildId && (typeof req.body.success === "boolean") && req.body.buildLog) {
            const response = await api.post(URL_API_BUILD_FINISH, {
                "buildId": req.body.buildId,
                "duration": 0, // TODO длительность сборки пока всегда равна нулю.
                "success": req.body.success,
                "buildLog": req.body.buildLog
            });
            res.status(200).send(makeResponse(200, "Build results were processed with success"));
        } else {
            res.status(500).send(makeResponse(500, "Build results were not processed. Incorrect request body"));
        }
    } catch(err) {
        printError(err);
        res.status(500).send(makeResponse(500, err.code));
    }
    res.end();
};

module.exports = { notifyBuildResult }
