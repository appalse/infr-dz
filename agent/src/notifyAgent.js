const axios = require('axios');
const { PORT,
        HOST,
        SERVER_PORT, 
        SERVER_HOST,
        URL_NOTIFY_AGENT,
        SERVER_NOT_RUNNING,
        ENOTFOUND, ECONNREFUSED } = require('./constants');
const {makeError, printError} = require('./utils');


async function notifyAgent() {
    console.log('notifyAgent');
    try {
        const body = {
            agentPort: PORT,
            agentHost: HOST
        } 
        const response = await axios.post(`${SERVER_HOST}:${SERVER_PORT}${URL_NOTIFY_AGENT}`, body);
        if (response.status !== 200) {
            throw makeError(response.status, 'notifyAgent=> ' + JSON.stringify(response.data));
        }
        console.log('Server response: ', response.data.data);
    } catch(err) {
        // Агент должен корректно обрабатывать ситуацию, когда при старте не смог соединиться с сервером.
        if (err.isAxiosError && (err.errno === ENOTFOUND || err.errno === ECONNREFUSED)) {
            console.error('BUILD SERVER IS NOT RUNNING. TERMINATE THIS AGENT WITH CODE: ', SERVER_NOT_RUNNING); 
        } else if (err.isAxiosError) {
            console.error('AxiosError: ', err.errno);
        } else {
            printError(err);
        }
        process.exit(SERVER_NOT_RUNNING);
    }
}

module.exports = {
    notifyAgent
}