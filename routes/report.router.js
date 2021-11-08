const express = require('express');
const router = express.Router();
const validatorHandler = require('../middlewares/validator.handler');
const checkAdminRole = require('../middlewares/auth.handler');
const { reportDto } = require('../dto/user.dto');
const passport = require('passport');

router.get('/',
passport.authenticate('jwt', { session: false }),
checkAdminRole,
validatorHandler(reportDto, 'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    res.json(body);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
