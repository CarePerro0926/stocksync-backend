const mysql = require('mysql2');
const { productos } = require('./data');

const db = mysql.createConnection({
  host: mysql.railway.internal,
  user: 'root',
  password: tPFuDhQUkwGcRRKTOOLIqPRODFzVwIvu,
  database: 'railway',
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a Railway');

  productos.forEach(p => {
    const query = 'INSERT INTO productos (id, nombre, categoria, cantidad, precio) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [p.id, p.nombre, p.categoria, p.cantidad, p.precio], (err) => {
      if (err) {
        console.error(`❌ Error en ${p.nombre}:`, err.message);
      } else {
        console.log(`✅ Insertado: ${p.nombre}`);
      }
    });
  });
});