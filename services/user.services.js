// const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const userSchema = require('../schemas/user.schema');

class userServices {
  constructor() {}

 async create(data) {
  const hashPass = await bcrypt.hash(data.contrasena, 10);
  const newUser = new userSchema({
    ...data,
    contrasena : hashPass
  })
  const save = await newUser.save()
  return save;
  }

  update() {

  }


}

module.exports = userServices;
