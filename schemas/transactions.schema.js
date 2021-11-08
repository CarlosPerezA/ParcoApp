const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    total: {type: Number, required: true},
    boleto: {type: String, required: true},
    fecha_creacion: {type: Date, default: Date.now},
    id_usuario: {type: String, required: true},
    id_estacionamiento: {type: String, default: 0}
});

const model = mongoose.model('Transactions', transactionSchema);
module.exports = model;
