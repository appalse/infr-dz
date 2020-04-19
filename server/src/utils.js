function makeError(status, message) {
    console.log('makeError: ', status, message);
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

module.exports = { 
    makeError,
    printError
}