// сохранить результаты сборки. В параметрах — id сборки, статус, лог (stdout и stderr процесса).
async function notifyBuildResult(req, res) {
    console.log('POST /notify-build-result');
};

module.exports = { notifyBuildResult }
