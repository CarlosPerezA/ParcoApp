const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const checkAdminRole = require('../middlewares/auth.handler');
const { reportDto } = require('../dto/user.dto');
const passport = require('passport');
const parkingServices = require('../services/parking.services');
const service = new parkingServices();
const exportCSV = require('../utils/exportCSV/export.csv');

router.get('/',
passport.authenticate('jwt', { session: false }),
checkAdminRole,
validatorHandler(reportDto, 'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    const report = await service.report(body);
    const createReport = exportCSV(report);
    res.download(createReport);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
