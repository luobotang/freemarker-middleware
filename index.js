var path = require('path')
var renderFtlTemplate = require('./lib/render')
var getDirFiles = require('./lib/getDirFiles')

module.exports = middleware

/**
 * @param {Object} options
 * @param {String} options.root
 * @param {Function} options.ondir
 * @param {Function} options.getdata
 * @return {Function}
 */
function middleware(options) {
	// as `root`
	if (typeof options === 'string') {
		options = {
			root: options
		}
	} else {
		options = options || {}
	}

	var root = options.root || process.cwd()
	var ondir = options.ondir || middleware.ondir
	var getdata = options.getdata || middleware.getdata

  var fs = options.fs = options.fs || require('fs')

	return function middleware(req, res, next) {
		var ftl = path.join(root, req.path)
    fs.stat(ftl, function(err, stats) {
			if (err) {
				next()
				return
			}

			if (stats.isDirectory()) {
				ondir(ftl, fs, req, res, next)
			} else if (stats.isFile()) {
				renderFile(ftl, req, res, next)
			} else {
				next()
			}
		})
	}

	function renderFile(file, req, res, next) {
		if (/\.ftl$/.test(file)) {
			renderFtl(file, req, res, next)
		} else {
			res.sendFile(file)
		}
	}

	function renderFtl(ftl, req, res, next) {
		renderFtlTemplate(req.path, getdata(req) || {}, {
			encoding: 'utf-8',
			viewFolder: root
		}, function(stdout, stderr) {
			res.set('Content-Type', 'text/html; charset=utf-8');
			stdout.pipe(res)

			stderr.on('data', function(err) {
				console.error(err)
			})
		})
	}
}

middleware.ondir = function (dir, fs, req, res, next) {
	getDirFiles(dir, fs, function(err, files) {
		if (err) {
			console.error(err)
			next()
			return
		}
		files.unshift('../')
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.send(renderFiles(files))
	})
}

middleware.getdata = function(req) {
	return req.$data
}

function renderFiles(files) {
	return (
		'<!DOCTYPE html>' +
		'<html>' +
		'<head>' +
			'<meta charset="UTF-8">' +
			'<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
			'<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
			'<title>FreemarkerMiddleware</title>' +
		'</head>' +
		'<body>' +
			'<ul>' +
				files.map(function(file) {
					return '<li><a href="' + file + '">' + file + '</a></li>'
				}).join('') +
			'</ul>' +
		'</body>' +
		'</html>'
	)
}
