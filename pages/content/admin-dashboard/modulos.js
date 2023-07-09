import { useState } from 'react';
import Dialog from '@/components/modals/MateriaModal';

export default function Modulos({ modulos }) {
    const [activeTab, setActiveTab] = useState('modulo1');
    const [materia, setMateria] = useState({});

    const nombreOnChange = (e) => {
        setMateria({ ...materia, nombre: e.target.value });
    };

    const precioOnChange = (e) => {
        setMateria({ ...materia, precio: e.target.value });
    };

    const modificarMateria = (id) => {
        const mat = modulos.find(materia => materia.id_materias === id);
        setMateria(mat);
    };

    const saveModuleChanges = async () => {
        await fetch('http://localhost:3000/api/materias/', {
            method: 'PUT',
            body: JSON.stringify(materia)
        })
    };

    const eliminarMateria = async (id) => {
        await fetch('http://localhost:3000/api/materias/', {
            method: 'DELETE',
            body: JSON.stringify(id)
        })
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <main>
            <div className="container">
                <ul className="nav nav-pills nav-fill p-3">
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'modulo1' ? 'active' : ''}`}
                            onClick={() => handleTabClick('modulo1')} aria-current="page" href="#">Modulo 1</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'modulo2' ? 'active' : ''}`}
                            onClick={() => handleTabClick('modulo2')} href="#">Modulo 2</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'modulo3' ? 'active' : ''}`}
                            onClick={() => handleTabClick('modulo3')} href="#">Modulo 3</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div
                        className={`tab-pane fade ${activeTab === 'modulo1' ? 'show active' : ''}`}
                        id="modulo1"
                    >
                        <h1>Materias</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    modulos
                                        .filter(modulo => modulo.modulo_id === 1)
                                        .map(modulo =>
                                        (
                                            <tr key={modulo.id_materias}>
                                                <td>{modulo.nombre}</td>
                                                <td>{modulo.precio}</td>
                                                <td>
                                                    <button type="button" onClick={() => modificarMateria(modulo.id_materias)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Modificar
                                                    </button>
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => eliminarMateria(modulo.id_materias)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                }
                            </tbody>
                        </table>

                    </div>
                    <div
                        className={`tab-pane fade ${activeTab === 'modulo2' ? 'show active' : ''}`}
                        id="modulo2"
                    >
                        <h1>Materias</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    modulos
                                        .filter(modulo => modulo.modulo_id === 2)
                                        .map(modulo =>
                                        (
                                            <tr key={modulo.id_materias}>
                                                <td>{modulo.nombre}</td>
                                                <td>{modulo.precio}</td>
                                                <td>
                                                    <button type="button" onClick={() => modificarMateria(modulo.id_materias)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Modificar
                                                    </button>
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => eliminarMateria(modulo.id_materias)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div
                        className={`tab-pane fade ${activeTab === 'modulo3' ? 'show active' : ''}`}
                        id="modulo3"
                    >
                        <h1>Materias</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Modificar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    modulos
                                        .filter(modulo => modulo.modulo_id === 3)
                                        .map(modulo =>
                                        (
                                            <tr key={modulo.id_materias}>
                                                <td>{modulo.nombre}</td>
                                                <td>{modulo.precio}</td>
                                                <td>
                                                    <button type="button" onClick={() => modificarMateria(modulo.id_materias)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Modificar
                                                    </button>
                                                </td>
                                                <td>
                                                    <button type="button" onClick={() => eliminarMateria(modulo.id_materias)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modificar</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={saveModuleChanges}>
                                <div className="modal-body">
                                    <div className='mb-3'>
                                        <label htmlFor='nombre' className='form-label'>Nombre:</label>
                                        <input type='text' className='form-control' id='nombre' value={materia.nombre} onChange={nombreOnChange} />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='precio' className='form-label'>Precio:</label>
                                        <input type='text' className='form-control' id='precio' value={materia.precio} onChange={precioOnChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export async function getServerSideProps(context) {
    const data = await fetch(`${process.env.URL}/api/materias`);
    const modulos = await data.json();

    return {
        props: {
            modulos: modulos.materias,
        }
    }
}
