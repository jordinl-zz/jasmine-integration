function Iframe() {
  this.$el = $("iframe#jasmine-iframe");
  if(this.$el.length == 0) {
    this.$el = $("<iframe id='jasmine-iframe' style='width:0;height:0'></iframe>");
    $("body").prepend(this.$el);
  }

  var isReady;
  var oldBody;

  this.$el[0].onload = function() { isReady = true; }

  this.setSrc = function (src) {
    isReady = false;
    this.$el.attr("src", src);
  };

  this.click = function(selector) {
    isReady = false;
    this.find(selector)[0].dispatchEvent(new Event("click"));
  };

  this.find = function(selector) {
    return this.$el.contents().find(selector);
  };

  this.ready = function(fun) {
    var that = this;
    if(!isReady) {
      setTimeout(function() { that.ready(fun) }, 200);
    } else {
      fun();
    }
  };

  this.waitFor = function(condition, fun, _maxTimeout) {
    var that = this;
    var maxTimeout;
    if(_maxTimeout === undefined) {
      maxTimeout = 1000;
    } else {
      maxTimeout = _maxTimeout;
    }

    if(maxTimeout <= 0) {
      return false;
    }

    if(condition()) {
      fun();
    } else {
      setTimeout(function() { that.waitFor(condition, fun, maxTimeout - 100) }, 100);
    }
  };

  this.show = function() {
    this.$el.css("width", $(document).width());
    this.$el.css("height", $(document).height());
  };

  this.hide = function() {
    this.$el.css("width", 0);
    this.$el.css("height", 0);
  };

  this.body = function() {
    return this.find("html").html();
  }
}

function visit(path) {
  var iframe = new Iframe();
  iframe.setSrc("http://localhost:8888" + path);

  return iframe;
}

