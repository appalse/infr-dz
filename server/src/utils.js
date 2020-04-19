function makeError(status, message) {
    console.log('makeError: ', status, message);
    return {
        data: message,
        status: status
    }
}

function printError(err) {
    if (err.status && err.data) {
        console.log('ERROR STATUS: ', err.status);
        console.log('ERROR DATA: ', err.data);
    } else {
        console.log('ERROR: ', err);
    }
}

module.exports = { 
    makeError,
    printError
}