let agentList = [];
let currentAgentNumber = 1;
const FREE_STATUS = 'Free';
const BUSY_STATUS = 'Busy';

function addAgent(host, port, agentNumber) {
    agentList.push({
        agentNumber: agentNumber,
        host: host,
        port: port,
        status: FREE_STATUS
    });
}

function changeStatus(agentNumber, newStatus) {
    agentList.forEach(agent => {
        if (agent.agentNumber === agentNumber) {
            agent.status = newStatus
        }
    })
}

function makeBusy(agentNumber) {
    changeStatus(agentNumber, BUSY_STATUS);
}

function makeFree(agentNumber) {
    changeStatus(agentNumber, FREE_STATUS);
}

function getFreeAgent() {
    for (let i = 0; i < agentList.length; i++) {
        if (agentList[i].status === FREE_STATUS) {
            return agentList[i];
        }
    }
    return null;
}

module.exports = {
    currentAgentNumber,
    FREE_STATUS,
    BUSY_STATUS,
    addAgent,
    makeBusy,
    makeFree,
    getFreeAgent
}