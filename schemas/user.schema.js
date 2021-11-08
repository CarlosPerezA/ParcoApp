const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: {type: String, required: true},
    telefono: {type: String, required: true},
    correo: {type: String, trim: true, lowercase: true, unique: true},
    fecha_creacion: {type: Date, default: Date.now},
    contrasena: {type: String, required: true},
    saldo_disponible: {type: Number, default: 0},
    role: {type: String, trim: true ,default: 'user'},
    accessToken: {type: String, trim: true, default: '0'}
});

const model = mongoose.model('Users', userSchema);
module.exports = model;
