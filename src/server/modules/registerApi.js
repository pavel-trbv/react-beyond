import express from 'express';
import api from '../api.js';

const PROD = process.env.NODE_ENV === 'production';

if (PROD) {
  module.exports = api;
} else {
  const app = express();
  app.use('/api', api);
  app.listen(3001, () => console.log(`==> API Server started on http://localhost:3001`))
}
