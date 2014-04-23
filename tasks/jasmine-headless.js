module.exports = function(grunt) {
  var sh = require('execSync'),
      exec = require('child_process').exec,
      yaml = require('js-yaml'),
      fs = require("fs"),
      jasmine_yaml = yaml.safeLoad(fs.readFileSync('config/jasmine.yml', 'utf8')),
      options = "";

  grunt.registerTask("jasmine:server:ci", "Run jasmine server headless mode", function() {
    if(jasmine_yaml.server_command) {
      exec(jasmine_yaml.server_command, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    }

    exec("node node_modules/jasmine-integration/src/server.js", function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
    });

    if(grunt.option("screenshot")) {
      options += " --screenshot=" + grunt.option("screenshot");
    }

    var code = sh.run("phantomjs node_modules/jasmine-integration/src/phantom-jasmine.js" + options);
    if(code !== 0) {
      grunt.fail.fatal("Tests failed!", code);
    }
  });
}
