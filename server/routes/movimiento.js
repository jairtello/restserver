const express = require("express");

const { verificaToken } = require("../middlewares/autenticacion");

let app = express();
let Movimiento = require("../models/movimiento");

/** Mostrar todos los movimientos */
app.get("/movimiento", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Movimiento.find({ estado: true })
    .sort({ $natural: -1 })
    .skip(desde)
    .populate({
      path: "producto",
      populate: { path: "categoria" },
    })
    .exec((err, movimientos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        movimientos,
      });
    });
});

/** Mostrar un movimiento por ID */
app.get("/movimiento/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  Movimiento.findById(id)
    .populate({
      path: "producto",
      populate: { path: "categoria" },
    })
    .exec((err, movimientoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!movimientoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "ID no existe",
          },
        });
      }

      res.json({
        ok: true,
        movimiento: movimientoDB,
      });
    });
});

/** Crear una movimiento */
app.post("/movimiento", verificaToken, (req, res) => {
  let body = req.body;

  let movimiento = new Movimiento({
    nombre: body.nombre,
    producto: body.producto,
    fecha: body.fecha,
    cantidad: body.cantidad,
  });

  movimiento.save((err, movimientoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(201).json({
      ok: true,
      movimiento: movimientoDB,
    });
  });
});

/** Actualizar un movimiento */
app.put("/movimiento/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Movimiento.findById(id, (err, movimientoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!movimientoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID no existe",
        },
      });
    }

    movimientoDB.nombre = body.nombre;
    movimientoDB.producto = body.producto;
    movimientoDB.fecha = body.fecha;
    movimientoDB.cantidad = body.cantidad;

    movimientoDB.save((err, movimientoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        producto: movimientoGuardado,
      });
    });
  });
});

/** Borrar un movimiento */
app.delete("/movimiento/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  let cambiaEstado = {
    estado: false,
  };

  Movimiento.findByIdAndUpdate(
    id,
    cambiaEstado,
    { new: true },
    (err, movimientoBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!movimientoBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Movimiento no encontrado",
          },
        });
      }

      res.json({
        ok: true,
        movimiento: movimientoBorrado,
      });
    }
  );
});

module.exports = app;
