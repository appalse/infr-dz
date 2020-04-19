const axios = require('axios');
const https = require('https');
const { API_BASE_URL, API_TOKEN,
        BUILD_REQUEST_DELAY, 
        URL_API_BUILD_LIST, 
        URL_API_CONF, 
        URL_API_BUILD_START,
        URL_AGENT_BUILD,
        API_BUILD_LIST_PARAMS} = require('./constants');
const {makeError, printError} = require('./utils');
const {getFreeAgent} = require('./agentList');

// build api
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: "Bearer " + API_TOKEN },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

// получить конфиг (репозиторий, команду, id, ветку) из апи 
async function getConfigDetails() {
    const response = await api.get(URL_API_CONF);
    if (response.status !== 200) {
        console.log(`ERROR IN RESPONSE OF CONFIGURATION SETTINGS FROM ${API_BASE_URL}`);
        throw makeError(response.status, 'getConfigDetails=> ' + JSON.stringify(response));
    }
    if (!response.data || !response.data.data) {
        console.log(`NO CONFIGURATION SETTINGS FOUND ON ${API_BASE_URL}`);
        return null;
    }
    return {
        id: response.data.data.id,
        repoName: response.data.data.repoName,
        buildCommand: response.data.data.buildCommand
    };
}

async function selectBuild(currentConfigId, buildsList) {
    let result = null;
    let currentBuildNumber = Number.MAX_SAFE_INTEGER;
    // выбрать из массива билд с "status": "Waiting" и 
    // наименьшим buildNumber, и чтобы currentConfigId совпадал
    buildsList.forEach(build => {
        if (build.configurationId !== currentConfigId ||
            build.status !== 'Waiting') {
            return;
        }
        if (currentBuildNumber > build.buildNumber) {
            currentBuildNumber = build.buildNumber;
            result = {};
            result['buildId'] = build.id;
            result['commitHash'] = build.commitHash;
            result['branchName'] = build.branchName;
        }
    });
    return result;
}

async function getBuildDetails(currentConfigId) {
    const response = await api.get(URL_API_BUILD_LIST, { params: API_BUILD_LIST_PARAMS });
    if (response.status !== 200) {
        throw makeError(response.status, 'getBuildDetails=> ' + JSON.stringify(response));
    }
    if (!response.data || !response.data.data || response.data.data.length === 0) {
        console.log(`NO BUILDS FOUND ON ${API_BASE_URL}`);
        return null;
    }
    // выбрать билд из списка
    const buildData = await selectBuild(currentConfigId, response.data.data);
    if (!buildData) {
        console.log(`NO APPROPRIATE BUILD FOUND WITH STATUS WAITING`);
        return null;
    }
    return {
        buildId: buildData.buildId,
        commitHash: buildData.commitHash,
        branchName: buildData.branchName
    };
}


async function getNextBuild() {
    const config = await getConfigDetails();
    if (!config) return null;
    const build = await getBuildDetails(config.id);
    if (!build) return null;
    return {
        repoName: config.repoName,
        buildCommand: config.buildCommand,
        buildId: build.buildId,
        commitHash: build.commitHash,
        branchName: build.branchName
    }
}

// отправить билд-агенту команду о том, что надо собрать сборку
async function startBuild(nextBuild) {
    console.log('startBuild');
    const agent = getFreeAgent();
    if (!agent) return false;
    const response = await axios.post(`${agent.host}:${agent.port}`, nextBuild);
    if (response.status === 200) {
        return true;
    }
    return false;
}

// уведомить апи БД о том, что сборка началась
async function postStartBuild(buildId, dateTime) {
    console.log('postStartBuild');
    const response = await api.post(URL_API_BUILD_START, {
        'buildId': buildId,
        'dateTime': dateTime
    });
    if (response.status !== 200) {
        throw makeError(response.status, 'postStartBuild=> ' + JSON.stringify(response));
    }
}

// Ходит за заданиями на сборку в базу (API) 
// и передает задание на сборку одному из агентов. 
// Потом принимает результаты сборки и записывает их в БД (API).
async function processBuilds() {
    console.log('processBuilds function');
    try {
        const nextBuild = await getNextBuild();
        console.log(nextBuild);
       
        const dateTime = new Date().toISOString();
        // отправить задание агенту 
        const isRun = await startBuild(nextBuild);
        // отправить POST на /build/start с buildId и dateTime
        if (isRun) {
            await postStartBuild(nextBuild.buildId, dateTime);
        }
    } catch(err) {
        printError(err);
    }
    //setTimeout(await processBuilds, BUILD_REQUEST_DELAY);
}

module.exports = { processBuilds }