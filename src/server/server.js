import express from 'express';
import path from 'path';
import http from 'http';

const PROD = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.Server(app);

const { renderPage }= require('./modules/ssr');

if (PROD) {

  app.use('/static/', express.static(path.resolve(__dirname, path.join(process.cwd(), 'public'))));

  app.use('/api', require('./modules/registerApi.js').api);

  app.get('*', renderPage);

  const io = require('socket.io')(server);

  io.on('connection', require('./socket').default)

} else {
  const HMR = require('./modules/hmr');

  HMR(app);

  app.get('*', renderPage);
}

server.listen(PORT, () => {
  console.log(`==> Server started on http://localhost:${PORT}, open page on browser`);
});
