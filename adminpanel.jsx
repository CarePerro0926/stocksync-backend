import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ id: '', nombre: '', categoria: '', cantidad: '', precio: '' });

  // 🔄 Cargar productos desde el backend
  const cargarProductos = () => {
    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('❌ Error cargando productos:', err));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ➕ Agregar producto
  const agregarProducto = () => {
    fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo)
    })
      .then(() => {
        cargarProductos();
        setNuevo({ id: '', nombre: '', categoria: '', cantidad: '', precio: '' });
      })
      .catch(err => console.error('❌ Error agregando producto:', err));
  };

  // ❌ Eliminar producto
  const eliminarProducto = (id) => {
    fetch(`http://localhost:3000/api/productos/${id}`, { method: 'DELETE' })
      .then(() => cargarProductos())
      .catch(err => console.error('❌ Error eliminando producto:', err));
  };

  return (
    <div>
      <h2>🛠 Panel de Administración</h2>

      <h3>➕ Agregar Producto</h3>
      <input placeholder="ID" value={nuevo.id} onChange={e => setNuevo({ ...nuevo, id: e.target.value })} />
      <input placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
      <input placeholder="Categoría" value={nuevo.categoria} onChange={e => setNuevo({ ...nuevo, categoria: e.target.value })} />
      <input placeholder="Cantidad" type="number" value={nuevo.cantidad} onChange={e => setNuevo({ ...nuevo, cantidad: e.target.value })} />
      <input placeholder="Precio" type="number" value={nuevo.precio} onChange={e => setNuevo({ ...nuevo, precio: e.target.value })} />
      <button onClick={agregarProducto}>Agregar</button>

      <h3>📦 Productos</h3>
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> — {p.categoria} — ${p.precio} — Stock: {p.cantidad}
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;