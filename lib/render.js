var spawn = require('child_process').spawn
var path = require('path')
var jarFile = path.join(__dirname, '/jar/FMtoll.jar')

/**
 * @param {String} path ftl file's full path
 * @param {*} dataModel
 * @param {Object} settings
 * @param {String} settings.encoding
 * @param {String} settings.viewFolder
 * @param {Function} callback callback(stdout, stderr)
 */
module.exports = function (path, dataModel, settings, callback) {
	var cmd = spawn('java', [
		'-jar',
		jarFile,
		JSON.stringify(settings),
		path.substring(1),
		JSON.stringify(dataModel)
	])
	callback(cmd.stdout, cmd.stderr)
	cmd.stderr.setEncoding('utf-8')
}