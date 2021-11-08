const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const userService = require('../services/user.services');
const { createUserDto, loginUserDto, updateUserDto, getUserDto, addCreditDto } = require('../dto/user.dto');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
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
passport.authenticate('local', { session: false }),
validatorHandler(loginUserDto, 'body'),
async(req, res, next) => {
  try {
    const user = req.user;
    const payload = {
      sub: user.id,
      role: user.role
    }
  const accessToken = jwt.sign(payload, config.jwtSecret);
  // eslint-disable-next-line no-unused-vars
  const saveToken = await service.token(user.id,accessToken);
    res.json({
      accessToken
    });
  } catch(error) {
    next(error);
  }
});

router.patch('/:id',
passport.authenticate('jwt', { session: false }),
validatorHandler(getUserDto, 'params'),
validatorHandler(updateUserDto, 'body'),
async(req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateDataUser = await service.update(id, body);
    res.status(200).json(updateDataUser);
  } catch(error) {
    next(error);
  }
});

router.post('/addCredit/:id',
passport.authenticate('jwt', { session: false }),
validatorHandler(getUserDto, 'params'),
validatorHandler(addCreditDto, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const credit = await service.addCredit(id, body);
    res.status(200).json(credit);
  } catch (error) {
    next(error);
  }
}
);


module.exports = router;
