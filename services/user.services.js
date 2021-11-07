const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class userServices {
  constructor() {
    this.users = [];
  }

  async create(data) {
   const newUser = {...data, fecha_creacion: new Date(), saldo_disponible: 0.00};
   this.users.push(newUser);
   return newUser;
  }

  update() {

  }


}

module.exports = userServices;
