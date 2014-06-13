var page = require('webpage').create(),
    url = 'http://localhost:8888',
    system = require("system"),
    fs = require("fs"),
    args = {},
    completedTests = 0;

var print = function(text) {
  fs.write("/dev/stdout", text, "w");
};

var printLine = function(text) {
  if(!text) {
    text = "";
  }
  print(text + "\n");
};

system.args.forEach(function(arg, index) {
  if(index > 0) {
    args[arg.split("=")[0].replace(/^--/, "")] = arg.split("=")[1];
  }
});

if(!args.trace) {
  console = {
    log: function() {},
    error: function() {}
  };
}

var finished = function() {
  return page.evaluate(function() {
    banner = document.getElementsByClassName("banner")[0];
    if(!banner) {
      return false;
    }
    return banner.getElementsByClassName("duration")[0]
  });
};

var success = function() {
  return page.evaluate(function(){
    return document.getElementsByClassName("failed").length == 0;
  })
};

var results = function() {
  return page.evaluate(function(){
    return document.getElementsByClassName("bar")[0].innerText;
  })
};

var printProgress = function() {
  var progress = [];

  progress = page.evaluate(function() {
    NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;
    var progress = [];

    resultsList = document.getElementsByClassName("symbol-summary")[0];

    if(resultsList && resultsList.children) {
      resultsList.children.forEach(function(result) {
        progress.push(result.getAttribute("class"));
      });
    }

    return progress;
  });

  for(i = completedTests; i < progress.length; i++) {
    if(progress[i] === "passed") {
      print("·");
    } else if(progress[i] === "failed") {
      print("F");
    } else {
      print("*");
    }
  }

  completedTests = progress.length;
};

var processTests = function(){
  if(args.screenshot) {
    page.render(args.screenshot);
  }

  printProgress();

  if(finished()) {
    printLine("\n");
    printLine(results());
    if(success()) {
      phantom.exit(0);
    } else {
      phantom.exit(1);
    }
  } else {
    setTimeout(function() {
      processTests()
    }, 200)
  }
};

setTimeout(function() {
  page.onCallback = function(data) {
    if(data.state === 'specDone') {
      print('jasmine_result' + JSON.stringify([].concat(data.results)));
    } else {
      phantom.exit(0);
    }
  };

  page.open(url, function (status) {
    if(status === "success") {
      printLine("Spec Runner loaded!");
    } else {
      printLine("Spec Runner not loaded!");
    }
      printLine();

    processTests();
  });
}, 200);
