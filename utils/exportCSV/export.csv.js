const fastcsv = require("fast-csv");
const fs = require("fs");
const date = new Date().toLocaleDateString();
const ws = fs.createWriteStream(`./utils/exportCSV/transactions.csv`);

let formatCSV = [
  {
    id: "id",
    total: "Total MXN",
    boleto: "boleto",
    id_usuario: "id_usuario",
    id_estacionamiento: "id_estacionamiento",
    fecha_creacion: "fecha_creacion",
  }
]

function exportCSV(data){
  formatCSV.push(...data);
  console.log(formatCSV);
fastcsv
  .write(formatCSV, { headers: false })
  .on('finish', function() {
    console.log("Write to CSV successfully!");
  })
  .pipe(ws);

  return ws.path;
}

module.exports = exportCSV;
