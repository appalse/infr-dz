const path = require('path');

const BUILD_REQUEST_DELAY = 1000;

// настройки из конфига билд сервера
const config = require(path.resolve(__dirname, './../server-conf.json'));
const PORT = config.port;
const API_BASE_URL = config.apiBaseUrl;
const API_TOKEN = config.apiToken;

// URLs
const URL_NOTIFY_AGENT = '/notify-agent';
const URL_NOTIFY_BUILD_REQUEST  = '/notify-build-result';
const URL_API_BUILD_LIST = '/build/list';
const URL_API_CONF = '/conf';
const URL_API_BUILD_START = '/build/start';
const URL_AGENT_BUILD = '/build';

const API_BUILD_LIST_PARAMS = {
    offset: 0,
    limit: 25
}

module.exports = {
    BUILD_REQUEST_DELAY,
    PORT,
    API_BASE_URL,
    API_TOKEN,
    URL_NOTIFY_AGENT,
    URL_NOTIFY_BUILD_REQUEST,
    URL_API_BUILD_LIST,
    URL_API_CONF,
    URL_API_BUILD_START,
    URL_AGENT_BUILD,
    API_BUILD_LIST_PARAMS
}