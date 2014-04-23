var page = require('webpage').create();
var url = 'http://localhost:8888';

var phantomConsole = console;

console = {
  log: function() {},
  error: function() {}
}

var finished = function() {
  return page.evaluate(function() {
    banner = document.getElementsByClassName("banner")[0];
    if(!banner) {
      return false;
    }
    return banner.getElementsByClassName("duration")[0]
  });
}

var success = function() {
  return page.evaluate(function(){
    return document.getElementsByClassName("failed").length == 0;
  })
}

var process = function(){
  page.render("/Users/pivotal/Desktop/foo.png");
  if(finished()) {
    if(success()) {
      phantomConsole.log("Success!");
      phantom.exit(0);
    } else {
      phantomConsole.log("Failure!");
      phantom.exit(1);
    }
  } else {
    setTimeout(function() {
      process()
    }, 200)
  }
}

setTimeout(function() {
  page.open(url, function (status) {
    if(status === "success") {
      phantomConsole.log("Spec Runner loaded!");
    } else {
      phantomConsole.log("Spec Runner not loaded!");
    }

    process();
  });
}, 200);
