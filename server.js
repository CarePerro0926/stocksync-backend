const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔗 Conexión a Railway
const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'tPFuDhQUkwGcRRKTOOLIqPRODFzVwIvu',
  database: 'railway',
  const PORT = process.env.PORT || 3000;
});

db.connect(err => {
  if (err) {
    console.error('❌ Error conectando a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a MySQL en Railway');
});

// 📦 Consultar productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productos ORDER BY id';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ➕ Agregar producto
app.post('/api/productos', (req, res) => {
  const { id, nombre, categoria, cantidad, precio } = req.body;
  const query = 'INSERT INTO productos (id, nombre, categoria, cantidad, precio) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, nombre, categoria, cantidad, precio], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Producto agregado' });
  });
});

// ❌ Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto eliminado' });
  });
});

// 🌱 Insertar productos desde data.js
const { productos } = require('./data'); // Asegúrate de que data.js exporte productos

app.post('/api/seed', (req, res) => {
  const query = 'INSERT INTO productos (id, nombre, categoria, cantidad, precio) VALUES (?, ?, ?, ?, ?)';

  productos.forEach(p => {
    db.query(query, [p.id, p.nombre, p.categoria, p.cantidad, p.precio], (err) => {
      if (err) {
        console.error(`❌ Error insertando ${p.nombre}:`, err.message);
      } else {
        console.log(`✅ Insertado: ${p.nombre}`);
      }
    });
  });

  res.json({ message: 'Productos insertados en Railway' });
});

// 🚀 Iniciar servidor — SIEMPRE al final
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}/api/productos`);
});

app.post('/api/sql', (req, res) => {
  const { query } = req.body;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
