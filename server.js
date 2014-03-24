var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require("fs"),
    connect = require('connect'),
    proxy = httpProxy.createProxyServer({}),
    dir = process.cwd();

var server = require('http').createServer(function(req, res) {
  res.loadFile = function(filePath, contentType) {
    fs.readFile(filePath, function(err, page) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(page);
      res.end();
    });
  };

  if(req.headers.referer && !req.url.match(/^\/\?spec/)) {
    proxy.web(req, res, { target: 'http://www.angularjs.org' });
  } else {
    res.loadFile(dir + '/SpecRunner.html', "text/html");
  }
});

console.log("listening on port 8888")
server.listen(8888);

connect.createServer(
    connect.static(dir)
).listen(8889);

