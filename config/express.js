'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  helmet = require('helmet'),
  config = require('./config'),
  path = require('path'),
  ejs = require('ejs'),
  async = require('async');


module.exports = function (config) {
  // Initialize express app
  var app = express();
  app.engine('.html', ejs.__express);
  app.set('view engine', 'html');

  // Globbing model files
  //config.getGlobbedFiles('./z_server/models/**/*.js').forEach(function (modelPath) {
  //  require(path.resolve(modelPath));
  //});

  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    next();
  });

  // Should be placed before express.static
  app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Showing stack errors
  app.set('showStackError', true);

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));

    // Disable views cache
    app.set('view cache', false);
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());

  // Enable jsonp
  app.enable('jsonp callback');

  app.get('/', function (req, res, next) {
    if (!config) {
      return next();
    }

    res.redirect(config.mainAddress);
  });


  var xml2json = require('xml2js');
  app.post('/wechat/vertificate', function (req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
      req.rawBody += chunk;
    });
    req.on('end', function () {
      xml2json.parseString(req.rawBody, function (err, result) {
        if (err) {
          return next(err);
        }
        console.log(result);
        req.rawBody = result;
        return next();
      });
    });
  });
  // Use helmet to secure Express headers
  //app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Setting the app router and static folder
  app.use('/', express.static(path.resolve('../yuyue-vue-app/yuyue-client/dist')));

  app.use(function (req, res, next) {

    // Environment dependent middleware
    if (process.env.NODE_ENV !== 'test') {
      console.log(new Date().toLocaleString() + ' : ' + req.path + JSON.stringify(req.body));
      console.log(new Date().toLocaleString() + ' : ' + req.path + JSON.stringify(req.query));
    }

    if (req.path.slice(-1) === '/' && req.path.length > 1) {
      res.status(404).json({
        error: {
          type: 'invalid_request_error',
          message: 'Unrecognized request URL (' +
            req.method + ': ' + req.originalUrl + ').'
        }
      });
    } else {
      next();
    }
  });

  // Globbing routing files
  config.getGlobbedFiles('./wechat_server/routes/**/*.js').forEach(function (routePath) {
    require(path.resolve(routePath))(app);
  });

  // Assume 'not found' in the error msgs is a 500. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function (err, req, res, next) {
    async.auto({
      RecordError: function (callback) {
        if (err) {
          console.error('system error resource=========');
          console.error('remoteAddress:', req._remoteAddress);
          console.error('method:', req.originalMethod);
          console.error('url:', req.url);
          console.error('err:', err);
          console.error('system error end !=========');
          return callback(err);
        }
        else {
          return callback();
        }
      },
      GetData: function (callback, results) {
        if (req.data) {
          return callback(null, req.data);
        } else {
          return callback();
        }
      }
    }, function (error, results) {
      if (error)
        return res.send(error);

      if (results.GetData)
        return res.send(results.GetData);

      if (!err) return next();
    });
  });

  // Assume 404 since no middleware responded
  app.use(function (req, res, next) {
    async.auto({
      RecordError: function (callback) {
        if (req.err) {
          console.error('self defined error resource=========');
          console.error('remoteAddress:', req._remoteAddress);
          console.error('method:', req.originalMethod);
          console.error('url:', req.url);
          console.error('err:', req.err);
          console.error('self defined error end !=========');
          return callback(req.err);
        }
        else {
          return callback();
        }
      },
      GetData: function (callback, results) {
        if (req.data) {
          return callback(null, req.data);
        } else {
          return callback();
        }
      }
    }, function (error, results) {
      if (error)
        return res.send(error);

      if (results.GetData)
        return res.send(results.GetData);

      res.status(404).json({
        error: {
          type: 'invalid_request_error',
          message: 'Unrecognized request URL (' +
            req.method + ': ' + req.originalUrl + ').'
        }
      });
    });
  });

  return app;
};


