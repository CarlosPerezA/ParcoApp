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

  async findByEmail(email){
    const user = await userSchema.findOne({ correo: email });
    return user;
  }

  async update(id, changes) {
  if(changes.contrasena) {
    const hashPass = await bcrypt.hash(changes.contrasena, 10);
    const data = await userSchema.findByIdAndUpdate(id, hashPass, { new: true });
    return data;
  }
  const data = await userSchema.findByIdAndUpdate(id, changes, { new: true });
  return data;
  }

  async addCredit(id, credit) {
    const currentCredit = await userSchema.findByIdAndUpdate(id, credit, { new: false });
    const sumarCredito = function (a, b) {
      return { saldo_disponible : a + b };
    };
    const addCredit = await userSchema.findByIdAndUpdate(id,
    sumarCredito(currentCredit.saldo_disponible,credit.saldo_disponible),
    {
      new: true
    });
    return addCredit;
  }

  async token(id,data){
    const saveToken = userSchema.findByIdAndUpdate(id, {accessToken: data},{ new: true });
    return saveToken;
  }

}

module.exports = userServices;
