# GastoClaro

Aplicación web para registrar gastos personales, clasificarlos por categoría y consultar totales.

## Estructura

```text
gastoclaro/
├── .github/
│   └── workflows/
│       └── ci.yml
├── perf/
│   └── load-test.js
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src/
│   ├── app.js
│   ├── calculos.js
│   └── server.js
├── tests/
│   ├── api.test.js
│   └── calculos.test.js
├── .gitignore
├── package.json
└── README.md
```

## Uso

Instala las dependencias:

```bash
npm install
```

Inicia el gestor:

```bash
npm start
```

Ejecuta las pruebas:

```bash
npm test
```

## Integración Continua

Cada push a `main` ejecuta GitHub Actions: instala las dependencias con npm y corre las pruebas de Jest y Supertest. El workflow está en `.github/workflows/ci.yml`.
