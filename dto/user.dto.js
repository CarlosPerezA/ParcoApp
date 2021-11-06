const Joi = require('joi');

const id_usario = Joi.string().id();
const nombre = Joi.string().alphanum().min(3);
const telefono = Joi.number().integer().positive();
const correo = Joi.string().email();
const contraseña = Joi.string().alphanum().min(8);
const abono = Joi.number().positive();
const total = Joi.number().positive();
const id_estacionamiento = Joi.string().id();

const createUserDto = Joi.object({
  nombre: nombre.require(),
  telefono: telefono.required(),
  correo: correo.required(),
  contraseña: contraseña.require()
});

const loginUserDto = Joi.object({
  correo: correo.required(),
  contraseña: contraseña.required(),
});

const updateUserDto = Joi.object({
  nombre: nombre.require(),
  telefono: telefono.required(),
  correo: correo.required(),
  contraseña: contraseña.require()
});

const payBalanceDto = Joi.object({
  id_usario : id_usario.required(),
  abono: abono.required(),
});

const payParkingDto = Joi.object({
  id_usario: id_usario.required(),
  total: total.required(),
  id_estacionamiento: id_estacionamiento.required(),
});

const filterdTransactions = Joi.object({
  id_usario: id_usario.required(),
});

module.exports =
{ createUserDto,
  loginUserDto,
  updateUserDto,
  payBalanceDto,
  payParkingDto,
  filterdTransactions
}
