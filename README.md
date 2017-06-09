# freemarker-middleware

[![NPM](https://nodei.co/npm/freemarker-middleware.png?compact=true)](https://nodei.co/npm/freemarker-middleware/)

Express middleware to render FreeMarker template file(*.ftl).

## install

use NPM:

```
npm install freemarker-middleware
```

## usage

with express, use freemarker-middleware:

```javascript
var app = require('express')()
var freeMarkerMiddleware = require('freemarker-middleware')

app.use(freeMarkerMiddleware(__dirname + '/ftl'))
// ...
```

## options

```javascript
freeMarkerMiddleware(__dirname + '/ftls')

// OR:

freeMarkerMiddleware({
  root: __dirname + '/ftls',
  ondir: function(dir, req, res, next) {
    // ...
  },
  getdata: function(req) {
    // ...
  }
})
```
