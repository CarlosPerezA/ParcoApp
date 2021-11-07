const Joi = require('joi');

const id_usario = Joi.string().id();
const nombre = Joi.string().min(3);
const telefono = Joi.string().pattern(/^[0-9]+$/, 'numbers').length(10);
const correo = Joi.string().email();
const contrasena = Joi.string().alphanum().min(8);
const abono = Joi.number().positive();
const total = Joi.number().positive();
const id_estacionamiento = Joi.string().id();

const createUserDto = Joi.object({
  nombre: nombre.required(),
  telefono: telefono.required(),
  correo: correo.required(),
  contrasena: contrasena.required()
});

const loginUserDto = Joi.object({
  correo: correo.required(),
  contraseña: contrasena.required(),
});

const updateUserDto = Joi.object({
  id: id_usario.required(),
  nombre: nombre.required(),
  telefono: telefono.required(),
  correo: correo.required(),
  contraseña: contrasena.required()
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
