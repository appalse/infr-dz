const path = require('path');
const config = require(path.resolve(__dirname, './../agent-conf.json'));

// настройки из конфига билд агента
const HOST = config.host || 'localhost';
const PORT = config.port;
const SERVER_PORT = config.serverPort;
const SERVER_HOST = config.serverHost;

// URLs
const URL_NOTIFY_AGENT = '/notify-agent';
const URL_NOTIFY_BUILD_REQUEST  = '/notify-build-result';
const URL_AGENT_BUILD = '/build';

// return code
const OK = 0;
const SERVER_NOT_RUNNING = 25;

// error
const ENOTFOUND = 'ENOTFOUND';
const ECONNREFUSED = 'ECONNREFUSED';

module.exports = {
    PORT,
    HOST,
    SERVER_PORT,
    SERVER_HOST,
    URL_NOTIFY_AGENT,
    URL_NOTIFY_BUILD_REQUEST,
    URL_AGENT_BUILD,
    OK,
    SERVER_NOT_RUNNING,
    ENOTFOUND,
    ECONNREFUSED
}