var fs = require('fs')
var path = require('path')
var express = require('express')
var freeMarkerMiddlewar = require('../index')

var app = express()
app.use(function(req, res, next) {
	// inject mock data
	if (req.path.match(/\.ftl$/)) {
		req.$data = {
			name: 'FreeMarkerMiddleware'
		}
	}
	next()
})
app.use('/api', function(req, res, next) {
	var file = path.join(__dirname, 'api', req.path)
	try {
		var ret = getClearModule(file)
		if (typeof ret === 'function') {
			ret = ret(req)
		}
		res.set('Content-Type', 'application/json');
		res.send(JSON.stringify(ret))
	} catch (e) {
		res.status(404)
		res.send(e.message)
	}
})
app.use('/page', freeMarkerMiddlewar(__dirname + '/pages'))
app.use('/static', express.static(__dirname + '/static'))
app.listen(10008, function() {
	console.log('running on 10008...')
})

function getClearModule(file) {
	var modulePath = require.resolve(file)
	delete require.cache[modulePath]
	return require(file)
}