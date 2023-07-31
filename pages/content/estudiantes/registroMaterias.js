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
    this.productos.splice(index, 1);
    this.subtotal -= this.productos.precio * this.productos.cantidad;

    this.actualizarTotal();
  }

  actualizarTotal() {
    // Podrías agregar aquí impuestos, descuentos u otros cálculos adicionales
    this.total = this.subtotal;
  }
}

export default function registroMaterias({ materias, modulos }) {
  const [compra, setCompra] = useState(new Compra());
  const [modulo, setModulo] = useState({});
  const [materia, setMateria] = useState({});

  const handleAgregarProducto = (id, type) => {
    const nuevaCompra = new Compra([...compra.productos]); // Crear una nueva instancia basada en la compra actual
    console.log(nuevaCompra)

    if (type === "modulo") {
      const prod = modulos.find((item) => item.id_modulo == id);
      const producto = new Producto(prod.nombre, prod.precio);
      nuevaCompra.agregarProducto(producto, 1);
    } else {
      const prod = materias.find((item) => item.id_materias == id);
      const producto = new Producto(prod.nombre, prod.precio);
      nuevaCompra.agregarProducto(producto, 1);
    }

    setCompra(nuevaCompra);
  };

  const handleEliminarProducto = (index, type) => {
    compra.eliminarProducto(index, type);
    setCompra({ ...compra }); // Actualizar el estado para volver a renderizar
  };

  const seeMoreModulos = (id) => {
    const mod = modulos.find((item) => item.id_modulo == id);
    setModulo(mod);
  }

  const seeMoreMaterias = (id) => {
    const mat = materias.find((item) => item.id_materias == id);
    setMateria(mat);
  }

  useEffect(() => {
    console.log('Compra', compra)
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-3 card h-50"  >
            <div className="card-body">
              <i className="bi bi-bag"><strong> Mis productos</strong></i>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {
                  compra.productos.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{item.producto.nombre}</th>
                      <td>{item.producto.precio}</td>
                      <td><button className="btn btn-danger" onClick={() => handleEliminarProducto(index)}><i className="bi bi-trash3"></i></button></td>
                    </tr>
                  ))
                }
              </table>
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
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Modulos</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Materias</button>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                <div className="row">
                  {
                    modulos.map((modulo) => (
                      <div key={modulo.id_modulo} className="col-md-4 p-3 mx-auto" style={{ minWidth: "18rem" }}>
                        <div className="card" style={{ width: '18rem' }}>
                          <img src={`/sources/modulos/${modulo.id_modulo}.webp`} className="card-img-top" alt={modulo.nombre} />
                          <div className="card-body">
                            <h5 className="card-title">{modulo.nombre} {modulo.num_modulo}</h5>
                            <p className="card-text text-truncate">{modulo.descripcion}</p>
                          </div>
                          <div className="card-footer">
                            <div className="d-flex justify-content-between">
                              <label className="align-self-center text-body-secondary text-card">$ {modulo.precio}</label>
                              <button className="btn btn-primary" onClick={() => seeMoreModulos(modulo.id_modulo)} data-bs-toggle="modal" data-bs-target="#exampleModal">Ver mas</button>
                              <button className="btn btn-primary" onClick={() => handleAgregarProducto(modulo.id_modulo, "modulo")}>Anadir</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <div className="row">
                  {
                    materias.map((materia) => (
                      <div key={materia.id_materias}
                        className="col-md-4 p-3 mx-auto" style={{ minWidth: "18rem" }}>
                        <div className="card" style={{ width: '18rem' }}>
                          <img src="/sources/materias-img/clase-informatica.webp" className="card-img-top" alt={`${materia.nombre}`} />
                          <div className="card-body">
                            <h5 className="card-title">{materia.nombre}</h5>
                            <p className="card-text text-truncate">{materia.descripcion}</p>
                          </div>
                          <div className="card-footer">
                            <div className="d-flex justify-content-between">
                              <label className="align-self-center text-body-secondary text-card">$ {materia.precio}</label>
                              <button className="btn btn-primary" onClick={() => seeMoreMaterias(materia.id_materias)} data-bs-toggle="modal" data-bs-target="#modalMateria">Ver mas</button>
                              <button className="btn btn-primary" onClick={() => handleAgregarProducto(materia.id_materias, "Materias")}>Anadir</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{modulo.nombre}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className='mb-3'>
                      <h3>Descripción</h3>
                      <p>{modulo.descripcion}</p>
                    </div>
                    <div className='mb-3'>

                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Materias</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {
                            materias
                              .filter(materia => materia.modulo_id === modulo.id_modulo)
                              .map(mat =>
                              (
                                <tr key={mat.id_materias}>
                                  <td>{mat.nombre}</td>
                                </tr>
                              )
                              )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="modalMateria" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{materia.nombre}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className='mb-3'>
                      <h3>Descripción</h3>
                      <p>{materia.descripcion}</p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
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