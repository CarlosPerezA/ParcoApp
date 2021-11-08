const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const userServices = require('../../../services/user.services');
const service = new userServices();

const LocalStrategy = new Strategy(
  {
    usernameField: 'correo',
    passwordField: 'contrasena'
  },
  async(email, password, done) => {
  try{
   const user = await service.findByEmail(email);
   if(!user){
    done(boom.unauthorized(), false);
   }
   const passwordMatch = await bcrypt.compare(password, user.contrasena);
   if(!passwordMatch){
    done(boom.unauthorized(), false);
   }
    done(null, user);
  }catch(error){
    done(error, false);
  }

});

module.exports = LocalStrategy;
