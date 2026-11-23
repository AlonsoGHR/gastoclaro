const request = require('supertest');
const app = require('../src/app');

test('health devuelve estado ok', async () => {
  const respuesta = await request(app).get('/health');
  expect(respuesta.status).toBe(200);
  expect(respuesta.body.status).toBe('ok');
});

test('crea y lista gastos', async () => {
  const creado = await request(app).post('/api/gastos').send({
    descripcion: 'Comida',
    monto: 80,
    categoria: 'Comida',
    fecha: '2026-11-23'
  });
  expect(creado.status).toBe(201);

  const listado = await request(app).get('/api/gastos');
  expect(listado.body).toContainEqual(creado.body);
});

test('elimina un gasto', async () => {
  const creado = await request(app).post('/api/gastos').send({
    descripcion: 'Transporte',
    monto: 50,
    categoria: 'Transporte',
    fecha: '2026-11-23'
  });
  const eliminado = await request(app).delete(`/api/gastos/${creado.body.id}`);
  expect(eliminado.status).toBe(204);
});
