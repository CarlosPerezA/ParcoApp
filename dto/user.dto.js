const Joi = require('joi');

const id_usuario = Joi.string().id();
const nombre = Joi.string().min(3);
const telefono = Joi.string().pattern(/^[0-9]+$/, 'numbers').length(10);
const correo = Joi.string().email();
const contrasena = Joi.string().alphanum().min(8);
const saldo_disponible = Joi.number().positive().min(1);
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
  nombre: nombre,
  telefono: telefono,
  correo: correo,
  contrasena: contrasena
});

const getUserDto = Joi.object({
  id: id_usuario.required()
});

const addCreditDto = Joi.object({
  saldo_disponible: saldo_disponible.required(),
});

const payParkingDto = Joi.object({
  total: total.required(),
  id_estacionamiento: id_estacionamiento.required(),
});

module.exports =
{ createUserDto,
  loginUserDto,
  updateUserDto,
  getUserDto,
  addCreditDto,
  payParkingDto,
}
