const axios = require('axios');
const { SERVER_PORT, 
        SERVER_HOST,
        URL_NOTIFY_BUILD_REQUEST } = require('./constants');
const {makeError, printError} = require('./utils');

const del = require('del');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {v4: uuidv4} = require('uuid');


async function startBuild({repoName, commitHash, buildCommand, buildId}) {
    // функция выполняется асинхронно, никто не ждет ее окончания
    const repoFolder = uuidv4().substring(0, 7);
    let body = {
        success: false,
        buildLog: '',
        buildId: buildId
    };
    try {
        // выкачать repoName
        // перейти в папку с репозиторием, переключиться на ветку и комит и 
        // начать выполнять команду buildCommand
        const { err, stdout, stderr } = await exec(`git clone ${repoName} ${repoFolder} && cd ${repoFolder} && git checkout ${commitHash} && ${buildCommand}`);
        console.log('ERR:', err);
        console.log('STDOUT:', stdout);
        console.log('STDERR:', stderr);
        body.success = true;
        body.buildLog = 'STDOUT: ' + stdout + '. STDERR: ' + stderr;
    } catch(err) {
        body.buildLog = JSON.stringify(err);
    } finally {
        const deletedPaths = await del([repoFolder]);
        console.log('deleted paths: ', deletedPaths);
    }
        
    try {
        const response = await axios.post(`${SERVER_HOST}:${SERVER_PORT}${URL_NOTIFY_BUILD_REQUEST}`, body);
        if (response.status !== 200) {
            throw makeError(response.status, 'startBuild=> ' + JSON.stringify(response.data));
        }
        console.log('notify build request response:', response.data.data);
    } catch(err) {
        printError(err);
    }
}

module.exports = {
    startBuild
}