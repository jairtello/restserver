/**
 * PUERTO
 */

/**ENTORNO */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**VENCIMIENTO DEL TOKEN */
process.env.CADUCIDAD_TOKEN = "48h";

/**SEED DE AUTENTICACION */
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

/**BASE DE DATOS */
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/market";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

process.env.PORT = process.env.PORT || 3000;
