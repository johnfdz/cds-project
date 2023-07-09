import { useEffect, useState } from "react"
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
    console.log('indice', index)
    console.log('Compra', this.productos)
    this.productos.splice(index, 1);
    // this.subtotal -= producto.precio * cantidad;
    // this.actualizarTotal();
  }

  actualizarTotal() {
    // Podrías agregar aquí impuestos, descuentos u otros cálculos adicionales
    this.total = this.subtotal;
  }
}

export default function registroMaterias({ materias, modulos }) {
  const [compra, setCompra] = useState(new Compra());;
  const compras = new Compra();

  const handleAgregarProducto = (id, type) => {
    if (type === "modulo") {
      const prod = modulos.find((item) => item.id_modulo == id);
      const producto = new Producto(prod.nombre, prod.precio);
      compras.agregarProducto(producto, 1);
      setCompra({ ...compras }); // Actualizar el estado para volver a renderizar
    } else {
      console.log(id)
      const prod = materias.find((item) => item.id_materias == id);
      console.log(prod)
      const producto = new Producto(prod.nombre, prod.precio);
      compras.agregarProducto(producto, 1);
      setCompra({ ...compras }); // Actualizar el estado para volver a renderizar
    }
  };

  const handleEliminarProducto = (index, type) => {
    compras.eliminarProducto(index, type);
    setCompra({ ...compra }); // Actualizar el estado para volver a renderizar
  };

  useEffect(() => {
    console.log('Compra', compra)
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-2 card h-50"  >
            <div className="card-body">
              <i class="bi bi-bag"><strong> Mis productos</strong></i>
              {
                compra.productos.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between">
                    <label className="align-self-center text-body-secondary text-card">{item.producto.nombre}</label>
                    <div className="d-flex justify-content-between">
                      {/* <label className="align-self-center text-body-secondary text-card">{item.cantidad}</label> */}
                      <label className="align-self-center text-body-secondary text-card">$ {item.producto.precio}</label>
                      {/* <a href="#" className="btn btn-primary" onClick={() => handleEliminarProducto(index)}>Eliminar</a> */}
                    </div>
                  </div>
                ))
              }
              <div className="d-flex justify-content-between">
                <label className="align-self-center text-body-secondary text-card">Subtotal</label>
                <label className="align-self-center text-body-secondary text-card">$ {compra.subtotal}</label>
              </div>
              <div className="d-flex justify-content-between">
                <label className="align-self-center text-body-secondary text-card">Total</label>
                <label className="align-self-center text-body-secondary text-card">$ {compra.total}</label>
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between">
                <a href="#" className="btn btn-primary">Comprar</a>
              </div>
            </div>
          </aside>
          <main className="col container-fluid">
            <h1>Matriculacion</h1>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Modulos</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Materias</button>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <div className="row">
                  {
                    modulos.map((modulo) => (
                      <div key={modulo.id_modulo} className="col-md-4 p-3 mx-auto">
                        <div className="card"  style={{ width: '18rem' }}>
                          <img src={`/sources/modulos/${modulo.num_modulo}.webp`} className="card-img-top" alt={modulo.nombre} />
                          <div className="card-body">
                            <h5 className="card-title">{modulo.nombre} {modulo.num_modulo}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          </div>
                          <div className="card-footer">
                            <div className="d-flex justify-content-between">
                              <label className="align-self-center text-body-secondary text-card">$ {modulo.precio}</label>
                              <a href="#" className="btn btn-primary" onClick={() => handleAgregarProducto(modulo.id_modulo, 'modulo')}>Anadir</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <div className="row">
                  {
                    materias.map((materia) => (
                      <div key={materia.id_materias} className="col-md-4 p-3 mx-auto">
                        <div className="card" style={{ width: '18rem' }}>
                          <img src="/sources/materias-img/" className="card-img-top" alt={`${materia.nombre}`} />
                          <div className="card-body">
                            <h5 className="card-title">{materia.nombre}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          </div>
                          <div className="card-footer">
                            <div className="d-flex justify-content-between">
                              <label className="align-self-center text-body-secondary text-card">$ {materia.precio}</label>
                              <a href="#" className="btn btn-primary" onClick={() => handleAgregarProducto(materia.id_materias, "Materias")}>Anadir</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/materias')
  const materias = await res.json()

  const mod = await fetch('http://localhost:3000/api/modulos')
  const modulos = await mod.json()

  return {
    props: {
      materias: materias.materias,
      modulos: modulos.modulos,
      revalidate: 10
    },
  }

}