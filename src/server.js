var http = require('http'),
    httpProxy = require('http-proxy'),
    fs = require("fs"),
    connect = require('connect'),
    yaml = require('js-yaml'),
    glob = require('glob'),
    _ = require('underscore'),
    proxy = httpProxy.createProxyServer({}),
    dir = process.cwd(),
    jasmine_yaml,
    files = [],
    specRunnerHtml,
    application_port,
    jasmine_port,
    proxy_port;

jasmine_yaml = yaml.safeLoad(fs.readFileSync('config/jasmine.yml', 'utf8'));
application_port = jasmine_yaml.application_port;
jasmine_port = jasmine_yaml.jasmine_port || 8888;
proxy_port = jasmine_yaml.proxy_port || 8889;

_.each(jasmine_yaml.src_files, function(file_glob) {
  _.each(glob.sync(file_glob), function(file) {
    files.push(file);
  });
});

_.each(jasmine_yaml.spec_files, function(file_glob) {
  _.each(glob.sync(file_glob), function(file) {
    files.push(file);
  });
});

specRunnerHtml = _.template(fs.readFileSync(__dirname + '/SpecRunner.tpl', 'utf8'));

var server = require('http').createServer(function(req, res) {
  res.loadFile = function(filePath, contentType) {
    fs.readFile(filePath, function(err, page) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(page);
      res.end();
    });
  };

  if(req.headers.referer && !req.url.match(/^\/\?$/) && !req.url.match(/^\/\?spec/)) {
    proxy.web(req, res, { target: 'http://localhost:' + application_port });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(specRunnerHtml({files: files, proxy_port: proxy_port}));
    res.end();
  }
});

console.log("listening on port " + jasmine_port);
server.listen(jasmine_port);

connect.createServer(
    connect.static(dir)
).listen(proxy_port);

