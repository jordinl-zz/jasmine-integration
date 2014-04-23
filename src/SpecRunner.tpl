<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Jasmine Spec Runner v2.0.0</title>

  <link rel="shortcut icon" type="image/png" href="http://localhost:<%= proxy_port %>/node_modules/jasmine-integration/node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine_favicon.png">
  <link rel="stylesheet" type="text/css" href="http://localhost:<%= proxy_port %>/node_modules/jasmine-integration/node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine.css">

  <script src="http://localhost:<%= proxy_port %>//node_modules/jasmine-integration/node_modules/jquery/dist/jquery.min.js"></script>
  <script type="text/javascript" src="http://localhost:<%= proxy_port %>/node_modules/jasmine-integration/node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine.js"></script>
  <script type="text/javascript" src="http://localhost:<%= proxy_port %>/node_modules/jasmine-integration/node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/jasmine-html.js"></script>
  <script type="text/javascript" src="http://localhost:<%= proxy_port %>/node_modules/jasmine-integration/node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.0/boot.js"></script>
  <script type="text/javascript" src="http://localhost:<%= proxy_port %>/node_modules/jasmine-integration/src/jasmine-integration.js"></script>

  <% _.each(files, function(file) { %>
    <script type="text/javascript" src="http://localhost:<%= proxy_port %>/<%= file %>"></script>
  <% }) %>
</head>

<body>
</body>
</html>
