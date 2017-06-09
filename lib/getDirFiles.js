var fs = require('fs')
var path = require('path')

module.exports = function (dir, callback) {
	fs.readdir(dir, function (err, files) {
		if (err) {
			callback(err);
		} else {
			var count = files.length
			var ret = []

			files.forEach(function (file) {
				stats(dir, file, resolveOne)
			})

			function resolveOne(err, file) {
				count--
				if (!err) {
					ret.push(file)
				}
				if (count <= 0) {
					callback(null, ret)
				}
			}
		}
	})
}

function stats(dir, file, callback) {
	fs.stat(path.join(dir, file), function (err, stats) {
		if (err) {
			callback(err);
		} else if (stats.isDirectory()) {
			callback(null, file + '/')
		} else if (stats.isFile()) {
			callback(null, file)
		} else {
			callback('no-file-or-dir')
		}
	});
}