const form = document.querySelector('#gasto-form');
const tabla = document.querySelector('#gastos');
const resumenCategorias = document.querySelector('#resumen-categorias');

async function cargarGastos() {
  const respuesta = await fetch('/api/gastos');
  const gastos = await respuesta.json();
  tabla.innerHTML = '';

  for (const gasto of gastos) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${gasto.descripcion}</td>
      <td>$${gasto.monto.toFixed(2)}</td>
      <td>${gasto.categoria}</td>
      <td>${gasto.fecha || ''}</td>
      <td><button type="button" data-id="${gasto.id}">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
  }
  await cargarResumen();
}

async function cargarResumen() {
  const respuesta = await fetch('/api/resumen');
  const resumen = await respuesta.json();
  document.querySelector('#total').textContent = `Total: $${resumen.total.toFixed(2)}`;
  document.querySelector('#total-header').textContent = `Total gastado: $${resumen.total.toFixed(2)}`;

  resumenCategorias.innerHTML = '';
  for (const [categoria, total] of Object.entries(resumen.porCategoria)) {
    const elemento = document.createElement('li');
    elemento.textContent = `${categoria}: $${total.toFixed(2)}`;
    resumenCategorias.appendChild(elemento);
  }
}

form.addEventListener('submit', async evento => {
  evento.preventDefault();
  const datos = Object.fromEntries(new FormData(form));
  const respuesta = await fetch('/api/gastos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  if (respuesta.ok) {
    form.reset();
    await cargarGastos();
  }
});

tabla.addEventListener('click', async evento => {
  if (!evento.target.dataset.id) return;
  await fetch(`/api/gastos/${evento.target.dataset.id}`, { method: 'DELETE' });
  await cargarGastos();
});

cargarGastos();
