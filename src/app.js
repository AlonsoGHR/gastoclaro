const express = require('express');
const path = require('path');
const compression = require('compression');
const { totalGeneral, totalPorCategoria } = require('./calculos');

const app = express();
let gastos = [];
let nextId = 1;

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: '1d' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/gastos', (req, res) => {
  res.json(gastos);
});

app.post('/api/gastos', (req, res) => {
  const { descripcion, monto, categoria, fecha } = req.body;
  const montoNumerico = Number(monto);

  if (!descripcion || !(montoNumerico > 0) || !categoria) {
    return res.status(400).json({ error: 'Datos invalidos' });
  }

  const gasto = {
    id: nextId++,
    descripcion,
    monto: montoNumerico,
    categoria,
    fecha
  };
  gastos.push(gasto);
  res.status(201).json(gasto);
});

app.delete('/api/gastos/:id', (req, res) => {
  gastos = gastos.filter(gasto => gasto.id !== Number(req.params.id));
  res.status(204).end();
});

app.get('/api/resumen', (req, res) => {
  res.json({
    total: totalGeneral(gastos),
    porCategoria: totalPorCategoria(gastos)
  });
});

module.exports = app;
