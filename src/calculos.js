function totalGeneral(gastos) {
  return gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
}

function totalPorCategoria(gastos) {
  const resultado = {};
  for (const gasto of gastos) {
    resultado[gasto.categoria] = (resultado[gasto.categoria] || 0) + gasto.monto;
  }
  return resultado;
}

module.exports = { totalGeneral, totalPorCategoria };
