module.exports = function(grunt) {
  var sh = require('execSync'),
      exec = require('child_process').exec,
      yaml = require('js-yaml'),
      fs = require("fs"),
      jasmine_yaml = yaml.safeLoad(fs.readFileSync('config/jasmine.yml', 'utf8'));


  grunt.registerTask("jasmine:server", "Run jasmine server", function() {
    if(jasmine_yaml.server_command) {
      exec(jasmine_yaml.server_command, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    }

    sh.run("node node_modules/jasmine-integration/server.js");
  })
}
