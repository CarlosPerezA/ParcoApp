const express = require('express');
const db = require('./db/config');
const routerApi = require('./routes/index');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3000;
db('mongodb://127.0.0.1:27017/api');

app.use(express.json());
app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor corriendo en puerto: ' + port);
})
