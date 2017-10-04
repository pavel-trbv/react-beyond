import express from 'express';
import path from 'path';

const PROD = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

const app = express();

const { renderPage }= require('./modules/ssr');

if (PROD) {

  app.use('/static/', express.static(path.resolve(__dirname, path.join(process.cwd(), 'build'))))

  app.use('/api', require('./modules/registerApi.js'))

  app.get('*', renderPage)

} else {
  const HMR = require('./modules/hmr');

  HMR(app);

  app.get('*', renderPage)
}

app.listen(PORT, () => {
  console.log(`\n==> Server started on http://localhost:${PORT}, open page on browser`);
});
