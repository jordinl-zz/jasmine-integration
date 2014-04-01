module.exports = function(grunt) {
  var sh = require('execSync');

  grunt.registerTask("jasmine:server", "Run jasmine server", function() {
    var command = "node node_modules/jasmine-integration/server.js";
    sh.run(command);
  })
}


