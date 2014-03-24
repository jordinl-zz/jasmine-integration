function Iframe() {
  var $iframe = $("iframe#jasmine-iframe");
  if($iframe.length == 0) {
    $iframe = $("<iframe id='jasmine-iframe' style='width:100%;height:1000px'></iframe>");
    $("body").prepend($iframe);
  }

  var ready;

  this.setSrc = function (src) {
    ready = false;
    $iframe[0].onload = function() { ready = true; }
    $iframe.attr("src", src);
  };

  this.find = function(selector) {
    return $iframe.contents().find(selector);
  };

  this.done = function(fun) {
    var that = this;
    if(!ready) {
      setTimeout(function() { that.done(fun) }, 200);
    } else {
      fun();
    }
  };
}

function visit(path) {
  var iframe = new Iframe();
  console.log(path)
  iframe.setSrc("http://localhost:8888" + path)

  return iframe;
}

function page() {
  return (new Iframe()).find("html");
};

