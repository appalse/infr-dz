function makeError(status, message) {
    return {
        data: message,
        status: status
    }
}

function printError(err) {
    if (err.status && err.data) {
        console.error('ERROR STATUS: ', err.status);
        console.error('ERROR DATA: ', err.data);
    } else {
        console.error('ERROR: ', err);
    }
}

function makeResponse(status, data) {
    return {
        status: status,
        data: data
    }
}

module.exports = { 
    makeError,
    printError,
    makeResponse
}