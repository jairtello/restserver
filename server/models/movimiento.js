var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movimientoSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  producto: { type: Schema.Types.ObjectId, ref: "Producto", required: true },
  fecha: {
    type: String,
    required: [true, "La fecha"],
  },
  cantidad: { type: Number, required: [true, "La cantidad es necesaria"] },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Movimiento", movimientoSchema);
