module.exports = function(grunt) {
  var sh = require('execSync'),
      exec = require('child_process').exec;

  exec("node node_modules/jasmine-integration/server.js", function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });

  grunt.registerTask("jasmine:server:ci", "Run jasmine server headless mode", function() {
    sh.run("phantomjs node_modules/jasmine-integration/src/phantom-jasmine.js");
  });
}
