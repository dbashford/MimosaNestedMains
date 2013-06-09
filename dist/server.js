var express = require('express'),
    engines = require('consolidate');

exports.startServer = function(config, callback) {

  var port = process.env.PORT || config.server.port;


  var app = express();
  var server = app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
  });

  app.configure(function() {
    app.set('port', port);
    app.set('views', config.server.views.path);
    app.engine(config.server.views.extension, engines[config.server.views.compileWith]);
    app.set('view engine', config.server.views.extension);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.compress());
    app.use(config.server.base, app.router);
    app.use(express.static(config.watch.compiledDir));
  });

  app.configure('development', function() {
    app.use(express.errorHandler());
  });

  cachebust = ''
  if (process.env.NODE_ENV !== "production") {
    cachebust = "?b=" + (new Date()).getTime()
  }

  var options = {
    reload:    config.liveReload.enabled,
    optimize:  config.isOptimize != null ? config.isOptimize : false,
    cachebust: cachebust
  };
  
	app.get('/', function(req, res) {
		var name = "index";
		if (config.isOptimize && config.server.views.html) {
			name += "-optimize";
		}
    res.render(name, options);
  });

	app.get('/app1', function(req, res) {
		var name = "app1";
		if (config.isOptimize && config.server.views.html) {
			name += "-optimize";
		}
    res.render(name, options);
  });

	app.get('/app2', function(req, res) {
		var name = "app2";
		if (config.isOptimize && config.server.views.html) {
			name += "-optimize";
		}
    res.render(name, options);
  });

  callback(server);
};

