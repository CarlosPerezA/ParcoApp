const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const parkingServices = require('../services/parking.services');
const { payParkingDto, userTransactions } = require('../dto/user.dto');
const passport = require('passport');
const service = new parkingServices();

router.get('/',
passport.authenticate('jwt', { session: false }),
async(req, res, next) => {
  try {
    const parkings = await service.parkings();
    res.status(200).json(parkings);
  } catch(error) {
    next(error);
  }
});

router.post('/pay',
passport.authenticate('jwt', { session: false }),
validatorHandler(payParkingDto, 'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    const pay = await service.payParking(body);
    res.json(pay);
  } catch(error) {
    next(error);
  }
});

router.get('/transactions',
passport.authenticate('jwt', { session: false }),
validatorHandler(userTransactions, 'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    const transactionsByUser = await service.transactions(body);
    res.json(transactionsByUser);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
