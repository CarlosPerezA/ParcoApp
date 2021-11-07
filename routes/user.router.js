const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const userService = require('../services/user.services');
const { createUserDto, loginUserDto, updateUserDto } = require('../dto/user.dto');

const service = new userService();

router.post('/new',
validatorHandler(createUserDto, 'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch(error) {
    next(error);
  }
});

router.post('/login',
validatorHandler(loginUserDto, 'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    res.status(200).json(body);
  } catch(error) {
    next(error);
  }
});


router.patch('/:id',
validatorHandler(updateUserDto, 'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    res.status(200).json(body);
  } catch(error) {
    next(error);
  }
});


module.exports = router;
