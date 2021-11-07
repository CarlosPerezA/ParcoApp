const boom = require('@hapi/boom');

function validatorHandler (dto, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = dto.validate(data);
      if(error) {
       next(boom.badRequest(error));
      }
      next();
  }
};

module.exports = validatorHandler;
