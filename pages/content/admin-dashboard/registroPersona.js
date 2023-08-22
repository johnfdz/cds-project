import { useState } from "react";
import { getSession } from "next-auth/react";

export default function RegistroMaestros({ contrato }) {
    //#region variables
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoContrato, setTipoContrato] = useState('');

    //#endregion


    //#region funciones setters variables
    const handleCedula = (e) => {
        setCedula(e.target.value);
    }

    const handleNombre = (e) => {
        setNombre(e.target.value);
    }

    const handleApellido = (e) => {
        setApellido(e.target.value);
    }

    const handleEdad = (e) => {
        setEdad(e.target.value);
    }

    const handleDireccion = (e) => {
        setDireccion(e.target.value);
    }

    const handleCorreo = (e) => {
        setCorreo(e.target.value);
    }

    const handleTelefono = (e) => {
        setTelefono(e.target.value);
    }

    const handleTipoContrato = (e) => {
        setTipoContrato(e.target.value);
    }

    const clearData = () => {
        setCedula('');
        setNombre('');
        setApellido('');
        setEdad('');
        setDireccion('');
        setCorreo('');
        setTelefono('');
        setTipoContrato('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/docente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cedula: cedula,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                direccion: direccion,
                correo: correo,
                telefono: telefono,
                tipo_contrato: tipoContrato,
            })
        })
        const json = await res.json() // traer la respuesta de la api
        if (!res.ok) throw Error(json.message)
        clearData();
    }

    //#endregion

    return (

        <main>
            <div className="container">
                <h1>Ficha docentes</h1>
                <form className="row" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Cedula</span>
                                <input type="text" value={cedula} onChange={handleCedula}
                                    className="form-control" aria-label="Cedula"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                                <input type="text" value={nombre} onChange={handleNombre}
                                    className="form-control" aria-label="Nombre"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Apellido</span>
                                <input type="text" value={apellido} onChange={handleApellido}
                                    className="form-control" aria-label="Apellido"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Edad</span>
                                <input type="number" value={edad} onChange={handleEdad}
                                    className="form-control" aria-label="Edad"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Direccion</span>
                                <input type="text" value={direccion} onChange={handleDireccion}
                                    className="form-control" aria-label="Direccion"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Correo</span>
                                <input type="email" value={correo} onChange={handleCorreo}
                                    className="form-control" aria-label="Correo"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                                <input type="tel" value={telefono} onChange={handleTelefono}
                                    className="form-control" aria-label="Telefono"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Tipo de contrato</span>
                                <select className="form-select" value={tipoContrato} onChange={handleTipoContrato}
                                    aria-label="Default select example">
                                    <option value=''>Seleccionar</option>
                                    {
                                        contrato.map((tipoContrato) => (
                                            <option key={tipoContrato.id} value={tipoContrato.id}>{tipoContrato.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <button className="btn btn-primary" type="submit" >Agregar</button>
                        </div>
                    </div>
                </form>
            </div >
        </main >
    )
}

export async function getServerSideProps(context) {
    const data = await fetch('http://localhost:3000/api/tipoContrato');
    const tiposContrato = await data.json();

    const session = await getSession(context);


    if (!session && session.user.rol !== 'admin') {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            contrato: tiposContrato.tipoContrato,
        }
    }
}