var yaml = require('js-yaml'),
    fs = require("fs"),
    glob = require('glob'),
    _ = require('underscore'),
    jasmine_yaml;

jasmine_yaml = yaml.safeLoad(fs.readFileSync('config/jasmine.yml', 'utf8'));

module.exports = jasmine_yaml;
module.exports.specRunnerHtml = _.template(fs.readFileSync(__dirname + '/SpecRunner.tpl', 'utf8'));
module.exports.application_port = jasmine_yaml.application_port;
module.exports.jasmine_port = jasmine_yaml.jasmine_port || 8888;
module.exports.proxy_port = jasmine_yaml.proxy_port || 8889;
module.exports.files = [];

_.each(jasmine_yaml.src_files, function(file_glob) {
  _.each(glob.sync(file_glob), function(file) {
    module.exports.files.push(file);
  });
});

_.each(jasmine_yaml.spec_files, function(file_glob) {
  _.each(glob.sync(file_glob), function(file) {
    module.exports.files.push(file);
  });
});
