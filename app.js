
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var program = require('./routes/program');

if (process.env.REDISTOGO_URL) {
  var redisUrl = require('url').parse(process.env.REDISTOGO_URL);
  var redis = require('redis').createClient(redisUrl.port, redisUrl.hostname);
  redis.auth(redisUrl.auth.split(':')[1]);
} else {
  var redis = require('redis').createClient();
}

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/program', program.load);
app.get('/program/:id', program.load);
app.post('/program', program.save);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
