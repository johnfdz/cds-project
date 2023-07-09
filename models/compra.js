import { useState } from 'react';
import Producto from '@/models/productos';

class Compra {
  constructor() {
    this.productos = [];
    this.subtotal = 0;
    this.total = 0;
  }

  agregarProducto(producto, cantidad) {
    this.productos.push({ producto, cantidad });
    this.subtotal += producto.precio * cantidad;
    this.actualizarTotal();
  }

  eliminarProducto(index) {
    const { producto, cantidad } = this.productos[index];
    this.productos.splice(index, 1);
    this.subtotal -= producto.precio * cantidad;
    this.actualizarTotal();
  }

  actualizarTotal() {
    // Podrías agregar aquí impuestos, descuentos u otros cálculos adicionales
    this.total = this.subtotal;
  }
}

const CompraPage = () => {
  const [compra, setCompra] = useState(new Compra());

  const handleAgregarProducto = () => {
    const producto = new Producto('Camiseta', 20);
    compra.agregarProducto(producto, 1);
    setCompra({ ...compra }); // Actualizar el estado para volver a renderizar
  };

  const handleEliminarProducto = (index) => {
    compra.eliminarProducto(index);
    setCompra({ ...compra }); // Actualizar el estado para volver a renderizar
  };

  return (
    <div>
      <h1>Compra</h1>
      <button onClick={handleAgregarProducto}>Agregar producto</button>
      <ul>
        {compra.productos.map((item, index) => (
          <li key={index}>
            {item.producto.nombre} - Cantidad: {item.cantidad}
            <button onClick={() => handleEliminarProducto(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Subtotal: {compra.subtotal}</p>
      <p>Total: {compra.total}</p>
    </div>
  );
};

export default CompraPage;
