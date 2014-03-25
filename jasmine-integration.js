function Iframe() {
  var $iframe = $("iframe#jasmine-iframe");
  if($iframe.length == 0) {
    $iframe = $("<iframe id='jasmine-iframe' style='width:0;height:0'></iframe>");
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

  this.ready = function(fun) {
    var that = this;
    if(!ready) {
      setTimeout(function() { that.ready(fun) }, 200);
    } else {
      fun();
    }
  };
}

function visit(path) {
  var iframe = new Iframe();
  iframe.setSrc("http://localhost:8888" + path)

  return iframe;
}

function page() {
  return (new Iframe()).find("html");
};


function showIframe() {
  $("iframe#jasmine-iframe").css("width", $(document).width());
  $("iframe#jasmine-iframe").css("height", $(document).height());
}

function hideIframe() {
  $("iframe#jasmine-iframe").css("width", 0);
  $("iframe#jasmine-iframe").css("height", 0);
}
