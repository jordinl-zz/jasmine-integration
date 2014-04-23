module.exports = function(grunt) {
  var sh = require('execSync'),
      exec = require('child_process').exec,
      configuration = require("../src/configuration"),
      options = "";

  grunt.registerTask("jasmine:server:ci", "Run jasmine server headless mode", function() {
    if(configuration.server_command) {
      exec(configuration.server_command, function(err, stdout, stderr) {
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
