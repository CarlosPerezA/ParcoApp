const express = require('express');

const usersRouter = require('./user.router');
const parkingRouter = require('./parking.router');
const reportRouter = require('./report.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/user',usersRouter);
  router.use('/parking',parkingRouter);
  router.use('/report',reportRouter);
}

module.exports = routerApi;
