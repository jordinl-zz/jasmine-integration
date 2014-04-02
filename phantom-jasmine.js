console.log('Loading a web page');
var page = require('webpage').create();
var url = 'http://localhost:8888';

page.open(url, function (status) {
  finished = function() {
    return page.evaluate(function() {
      banner = document.getElementsByClassName("banner")[0];
      if(!banner) {
        return false;
      }
      return banner.getElementsByClassName("duration")[0]
    });
  }

  success = function() {
    return page.evaluate(function(){
      return document.getElementsByClassName("failed").length == 0;
    })
  }

  process = function(){
    page.render("/Users/pivotal/Desktop/foo.png");
    if(finished()) {
      if(success()) {
        console.log("Success!");
        phantom.exit(0);
      } else {
        console.log("Failure!");
        phantom.exit(1);
      }
    } else {
      setTimeout(function() {
        process()
      }, 200)
    }
  }

  process();
});
