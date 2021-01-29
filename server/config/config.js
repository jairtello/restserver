/**
 * PUERTO
 */

/**ENTORNO */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

/**BASE DE DATOS */
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/market";
} else {
  urlDB =
    "mongodb+srv://jair:4fzPhb4fjRvhAzDa@cluster0.wiifn.mongodb.net/market";
}

process.env.URLDB = urlDB;

process.env.PORT = process.env.PORT || 3000;
