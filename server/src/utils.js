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
    } else if (err.response && err.response.status && err.response.statusText && err.response.data) {
        console.error('ERROR STATUS: ', err.response.status);
        console.error('ERROR STATUS TEXT: ', err.response.statusText);
        console.error('ERROR DATA: ', err.response.data);
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