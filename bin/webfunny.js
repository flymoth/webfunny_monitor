#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');
const {exec} = require("child_process")

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8011');
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// 启动静态文件服务器
var connect = require("connect");
var serveStatic = require("serve-static");
var app = connect();
app.use(serveStatic("./views/webfunny"));
app.listen(8010);

const openUrl = "http://localhost:8010/home.html"
switch (process.platform) {
  //mac系统使用 一下命令打开url在浏览器
  case "darwin":
      exec(`open ${openUrl}`);
      break;
  //win系统使用 一下命令打开url在浏览器
  case "win32":
      exec(`start ${openUrl}`);
      break;
      // 默认mac系统
  default:
      exec(`open ${openUrl}`);
      break;
}

