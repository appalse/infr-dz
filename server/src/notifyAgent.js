let {currentAgentNumber, addAgent} = require('./agentList');
const {printError, makeResponse} = require('./utils');

//  зарегистрировать агента. В параметрах хост и порт, на котором запущен агент
async function notifyAgent(req, res) {
    console.log('POST /notify-agent');
    try {
        if (req.body && req.body.agentHost && req.body.agentPort) {
            ++currentAgentNumber;
            addAgent(req.body.agentHost, req.body.agentPort, currentAgentNumber);
            res.status(200).send(makeResponse(200, "Agent was registrated with success"));
        } else {
            res.status(500).send(makeResponse(500, "Agent was not registrated. Incorrect request body"));
        }
    } catch(err) {
        printError(err);
    }
    res.end();
};

module.exports = { notifyAgent }
