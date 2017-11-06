import express from 'express';
import api from '../api.js';
import socketHundler from '../socket.js'

const PROD = process.env.NODE_ENV === 'production';

if (PROD) {
  module.exports.api = api;
  module.exports.socket = socketHundler;
} else {
  const app = express();
  app.use('/api', api);

  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  
  io.on('connection', socketHundler);

  server.listen(3001, () => console.log(`==> API Server started on http://localhost:3001`))
}
