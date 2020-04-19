

const express = require('express');
const cors = require('cors');
const {notifyBuildResult} = require('./src/notifyBuildResult');
const {notifyAgent} = require('./src/notifyAgent');
const {processBuilds} = require('./src/processBuilds');
const { BUILD_REQUEST_DELAY, 
        PORT, 
        URL_NOTIFY_AGENT, 
        URL_NOTIFY_BUILD_REQUEST } = require('./src/constants');


// Express.js
const app = express();
app.use(express.json());
app.use(cors());

// Ходит за заданиями на сборку в базу (API) 
// и передает задание на сборку одному из агентов. 
// Потом принимает результаты сборки и записывает их в БД (API).
setTimeout(processBuilds, BUILD_REQUEST_DELAY);

// URLs
//  зарегистрировать агента. 
// В параметрах хост и порт, на котором запущен агент
app.post(URL_NOTIFY_AGENT, notifyAgent);
// сохранить результаты сборки. 
// В параметрах — id сборки, статус, лог (stdout и stderr процесса).
app.post(URL_NOTIFY_BUILD_REQUEST, notifyBuildResult);


app.listen(PORT);
console.log(`Build-server is listening on localhost:${PORT}`);