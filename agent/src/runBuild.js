const {makeResponse} = require('./utils');

async function startBuild({repoName, branchName, commitHash, buildCommand, buildId}) {
    // функция выполняется асинхронно, никто не ждет ее окончания
    // выкачать repoName
    // переключиться на ветку branchName
    // перключиться на комит commitHash
    // перейти в папку с репозиторием и начать выполнять команду buildCommand
    // res.status(500).send(makeResponse(500, "Agent cannot run build. Error while getting repo or executing command"));
}

function runBuild(req, res) {
    console.log('POST /build');
    try {
        // В body - id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
        if (req.body && req.body.repoName && 
            req.body.buildCommand && req.body.buildId &&
            req.body.commitHash && req.body.branchName) {
                startBuild(req.body);
                res.status(200).send(makeResponse(200, "Build was run with success"));
        } else {
            res.status(500).send(makeResponse(500, "Agent cannot run build. Incorrect request body"));
        }
    } catch(err) {
        printError(err);
    }
    res.end();
}

module.exports = {
    runBuild
}