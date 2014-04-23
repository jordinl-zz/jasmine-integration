var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require("fs"),
    connect = require('connect'),
    proxy = httpProxy.createProxyServer({}),
    dir = process.cwd(),
    configuration = require("./configuration");

var server = require('http').createServer(function(req, res) {
  res.loadFile = function(filePath, contentType) {
    fs.readFile(filePath, function(err, page) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(page);
      res.end();
    });
  };

  if(req.headers.referer && !req.url.match(/^\/\?$/) && !req.url.match(/^\/\?spec/)) {
    proxy.web(req, res, { target: 'http://localhost:' + configuration.application_port });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(configuration.specRunnerHtml({files: configuration.files, proxy_port: configuration.proxy_port}));
    res.end();
  }
});

console.log("listening on port " + configuration.jasmine_port);
server.listen(configuration.jasmine_port);

connect.createServer(
    connect.static(dir)
).listen(configuration.proxy_port);

