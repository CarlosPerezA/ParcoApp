const db = require('mongoose');
//'mongodb://localhost:27017/api'
db.Promise = global.Promise;
async function connect(url) {
  await db.connect(url, {
  useNewUrlParser: true,
  });
  console.log('DB conectada con exito');
}

module.exports = connect;
