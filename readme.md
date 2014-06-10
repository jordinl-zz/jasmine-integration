## Installation

- Install grunt cli: `npm install grunt-cli -g`

- In package.json append to your devDependencies:

	````
	"jasmine-integration": "0.0.1"
	````
- Install node modules: `npm install`
 
- Add the following to your Gruntfile:

	````
	grunt.loadNpmTasks('jasmine-integration');
	````


## Basic setup for jasmine

Assuming test files are called *Spec.js and the app is a node app. Add the following to config/jasmine.yml

````
spec_files:
  - "**/*[Ss]pec.{js,coffee}"

application_port: 8080

server_command: "node server.js"
````


## Running tests

- To run tests in the browser `grunt jasmine:server`

- To run tests in headless mode `grunt jasmine:server:ci`