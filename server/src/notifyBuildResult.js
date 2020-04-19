const {makeResponse} = require('./utils');

// сохранить результаты сборки. В параметрах — id сборки, статус, лог (stdout и stderr процесса).
async function notifyBuildResult(req, res) {
    console.log('POST /notify-build-result');
    try {
        if (req.body && req.body.buildId && req.body.status && req.body.buildLog) {
            // TODO
            res.status(200).send(makeResponse(200, "Build results were processed with success"));
        } else {
            res.status(500).send(makeResponse(500, "Build results were not processed. Incorrect request body"));
        }
    } catch(err) {
        printError(err);
    }
    res.end();
};

module.exports = { notifyBuildResult }
