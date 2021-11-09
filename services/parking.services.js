const axios = require('axios');
const boom = require('@hapi/boom');
const transactionsSchema = require('../schemas/transactions.schema');
const userSchema = require('../schemas/user.schema');

class parkingServices {
  constructor(){}

  async parkings(){
    try {
      const response = await axios.get('https://dev.parcoapp.com/api/Parkings');
      return response.data;
    }catch(error) {
      return error;
    }
  }

  async payParking(data){
    try {
      const response = await axios.get('https://dev.parcoapp.com/api/Parkings');

      const search = (query) => {
        return response.data.filter(item => {
            return item.id.includes(query);
        });
      }

      const activeParking = search(data.id_estacionamiento);
      const user = await userSchema.findById(data.id_usuario).exec();
      if(activeParking[0].status != 0){
        throw boom.notFound('Parking not found');
      } else if(user.saldo_disponible < data.total){
        throw boom.badData('Insufficient credit');
      }
        // eslint-disable-next-line no-unused-vars
        const userPayment = await userSchema.findByIdAndUpdate(data.id_usuario,
        { saldo_disponible: user.saldo_disponible - data.total }, { new: true });

        const transaction = new transactionsSchema({
          ...data
        });
        const saveTransaction = await transaction.save();
        return saveTransaction;
    }catch(error) {
      return error;
    }
  }

  async transactions(id_usuario){
    const transactionById = transactionsSchema.find(id_usuario);
    return transactionById;
  }

  async report(data){
    if(data.id_estacionamiento){
      const report = await transactionsSchema.find({ fecha_creacion: { $gte: data.fecha_inicial , $lte: data.fecha_final}, id_estacionamiento: data.id_estacionamiento });
      return report;
    }
    const report = await transactionsSchema.find({ fecha_creacion: { $gte: data.fecha_inicial , $lte: data.fecha_final} });
    return report;
  }

}

module.exports = parkingServices;
