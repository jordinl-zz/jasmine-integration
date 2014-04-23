module.exports = function(grunt) {
  var sh = require('execSync'),
      exec = require('child_process').exec,
      configuration = require("../src/configuration");

  grunt.registerTask("jasmine:server", "Run jasmine server", function() {
    if(configuration.server_command) {
      exec(configuration.server_command, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    }

    sh.run("node node_modules/jasmine-integration/src/server.js");
  })
}
