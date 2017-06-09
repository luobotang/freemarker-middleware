# freemarker-middleware

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
freeMarkerMiddleware({
  // options...
})
```

- root {String}
- ondir {Function}

  args:
  - dir
  - req
  - res
  - next

- getdata {Function}

  args:
  - req
