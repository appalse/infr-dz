const {makeResponse} = require('./utils');
const {startBuild} = require('./startBuild');


function runBuild(req, res) {
    console.log('POST /build');
    try {
        // В body - id сборки, адрес репозитория, хэш коммита, команда, которую надо запустить
        if (req.body && req.body.repoName && 
            req.body.buildCommand && req.body.buildId &&
            req.body.commitHash) {
                startBuild(req.body);
                res.status(200).send(makeResponse(200, "Build was run with success"));
        } else {
            res.status(500).send(makeResponse(500, "Agent cannot run build. Incorrect request body"));
        }
    } catch(err) {
        printError(err);
        res.status(500).send(makeResponse(500, "Error on agent... See log in agent console"));
    }
    res.end();
}

module.exports = {
    runBuild
}