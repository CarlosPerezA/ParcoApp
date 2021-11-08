const express = require('express');
const db = require('./db/config');
const routerApi = require('./routes/index');
const cors = require('cors');
const passport = require('passport');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const { config } = require('./config/config');
const port = config.port;
db(config.dbUrl);

app.use(express.json());
app.use(cors());
require('./utils/auth')
app.use(passport.initialize());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Servidor corriendo en puerto: ' + port);
})
