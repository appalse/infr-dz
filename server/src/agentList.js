const axios = require('axios');
const { URL_AGENT_BUILD } = require('./constants');

let agentList = {};
let currentAgentNumber = 0;
const FREE_STATUS = 'Free';
const BUSY_STATUS = 'Busy';

function addAgent(host, port, agentNumber) {
    agentList[agentNumber.toString()] = {
        host: host,
        port: port,
        status: FREE_STATUS
    };
}

function changeStatus(agentNumber, newStatus) {
    for (let key in agentList) {
        if (key === agentNumber) {
            agentList[key].status = newStatus;
        }
    }
}

function makeBusy(agentNumber) {
    changeStatus(agentNumber, BUSY_STATUS);
}

function makeFree(agentNumber) {
    changeStatus(agentNumber, FREE_STATUS);
}

async function getFreeAgent() {
    for (let key in agentList) {
        if (agentList[key].status === FREE_STATUS) {
            try {
                // Сервер должен корректно обрабатывать ситуацию, когда агент прекратил работать между сборками.
                // отправим post - запрос без параметров, должен вернуться ответ, что параметры неправльные
                const response = await axios.post(`${agentList[key].host}:${agentList[key].port}${URL_AGENT_BUILD}`);
            } catch(err) {
                if (err.isAxiosError && err.response && 
                    err.response.data && 
                    err.response.data.data === 'Agent cannot run build. Incorrect request body') {
                        return agentList[key];
                    } else {
                        delete agentList[key];
                    }
            }
        }
    }
    return null;
}

module.exports = {
    agentList,
    currentAgentNumber,
    FREE_STATUS,
    BUSY_STATUS,
    addAgent,
    makeBusy,
    makeFree,
    getFreeAgent
}