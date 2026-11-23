const { totalGeneral, totalPorCategoria } = require('../src/calculos');

test('suma el total general', () => {
  expect(totalGeneral([{ monto: 100 }, { monto: 50 }])).toBe(150);
});

test('agrupa por categoria', () => {
  const resultado = totalPorCategoria([
    { categoria: 'Comida', monto: 80 },
    { categoria: 'Comida', monto: 20 }
  ]);
  expect(resultado).toEqual({ Comida: 100 });
});
