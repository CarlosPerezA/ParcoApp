const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const parkingServices = require('../services/parking.services');
const { payParkingDto, userTransactions } = require('../dto/user.dto');
const service = new parkingServices();

router.get('/', async(req, res, next) => {
  try {
    const parkings = await service.parkings();
    res.status(200).json(parkings);
  } catch(error) {
    next(error);
  }
});

router.post('/pay',
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
validatorHandler(userTransactions, 'body'),
async(req, res, next) => {
  try {
    const transactionsByUser = await service.transactions();
    res.json(transactionsByUser);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
