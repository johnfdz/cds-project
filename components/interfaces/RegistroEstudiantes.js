import { useState, useEffect } from "react"

export default function RegistroEstudiantes() {
    //#region  Variables    
    const [cedula, setCedula] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [email, setEmail] = useState('')
    const [nivelEducacion, setNivelEducacion] = useState('')
    const [promedio, setPromedio] = useState('')

    const [estudiantes, setEstudiantes] = useState([])
    const [estudiante, setEstudiante] = useState({})


    const valid = 'is-valid'
    const invalid = 'is-invalid'
    //#endregion


    const addStudent = () => {

        const newStudent = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            telefono: telefono,
            direccion: direccion,
            email: email,
            promedio: promedio
        }
        setEstudiante(newStudent)
    }

    //#region setteo de valores
    const handleCedulaChange = (e) => {
        const value = e.target.value
        const ced = document.getElementById('ced-mss')
        if (/^\d*$/.test(value)) {
            setCedula(value)
            if (value.length != 10) {
                ced.style.display = 'block'
            } else {
                ced.style.display = 'none'
            }
        }

    }

    const handleNameChange = (e) => {
        setNombre(e.target.value)
    }

    const handleApellidoChange = (e) => {
        setApellido(e.target.value)
    }

    const handleEdadChange = (e) => {
        const value = e.target.value
        console.log(edad)
        if (/^\d*$/.test(value)) {
            setEdad(value)
        }
    }

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value)
    }

    const handleDireccionChange = (e) => {
        setDireccion(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)

    }

    const handleEducacionChange = (e) => {
        console.log(e.target.value)
        setNivelEducacion(e.target.value)
    }

    const handlePromedioChange = (e) => {
        const value = e.target.value
        if (/^\d{0,2}(\.\d{0,2})?$/.test(value)) {
            setPromedio(value)
        }

    }

    //#endregion



    //#region Methods
    const getEstudiantes = async () => {
        const res = await fetch('http://localhost:3000/api/estudiante',
            {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            }
        )
        const data = await res.json()
        setEstudiantes(data)
    }

    const deleteEstudiante = async (id) => {
        await fetch('http://localhost:3000/api/estudiante/', {
            method: 'DELETE',
            body: JSON.stringify(id)
        })
    }

    const updateEstudiante = async (id) => {
        await fetch('http://localhost:3000/api/estudiante/', {
            method: 'PUT',
            body: JSON.stringify(id)
        })
    }

    const addEstudiante = async () => {
        await fetch('http://localhost:3000/api/estudiante', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                cedula,
                nombre,
                apellido,
                edad,
                telefono,
                direccion,
                email,
                nivelEducacion,
                promedio
            })
        })
    }
    //#endregion

    (() => {
        'use strict'
        if (typeof window !== 'undefined') {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
        }
    })()

    useEffect(() => {
        getEstudiantes()
        console.log(estudiantes)
    }, [])

    return (
        <main>
            <div className="container">
                <h1>Ficha alumnos</h1>
                <form className="row needs-validation" noValidate onSubmit={addEstudiante}>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="input-group mb-3 has-validation">
                                <span className="input-group-text">Cedula</span>
                                <input type="text" value={cedula} pattern="[0-9]{10}" maxLength="10"
                                    className={`form-control`} placeholder="0987654321"
                                    onChange={handleCedulaChange} required />
                                <div className="invalid-feedback" id="ced-mss">
                                    La cedula debe tener 10 digitos
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3 has-validation">
                                <span className="input-group-text">Nombre</span>
                                <input type="text" pattern="[A-Za-z]{3,20}"
                                    className="form-control"
                                    onChange={handleNameChange} required />
                                <div className="invalid-feedback">
                                    Ingrese caracteres validos
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3 has-validation">
                                <span className="input-group-text" id="basic-addon1">Apellido</span>
                                <input type="text" pattern="[A-Za-z]{3,20}"
                                    className="form-control" aria-label="Apellido"
                                    aria-describedby="basic-addon1" onChange={handleApellidoChange} required />
                                <div className="invalid-feedback">
                                    Ingrese caracteres validos
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3 has-validation">
                                <span className="input-group-text" id="basic-addon1">Edad</span>
                                <input type="text" pattern="[0-9]{1,2}" value={edad}
                                    className="form-control" aria-label="Edad"
                                    aria-describedby="basic-addon1" onChange={handleEdadChange} required />
                                <div className="invalid-feedback">
                                    Ingrese caracteres validos
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Direccion</span>
                                <input type="text" placeholder="Calle 1 y Calle 2" pattern="[A-Za-z0-9._%+-]{3,50}"
                                    className="form-control" aria-label="Direccion" value={direccion}
                                    aria-describedby="basic-addon1" onChange={handleDireccionChange} required />
                                <div className="invalid-feedback">
                                    Ingrese una direccion valida
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Correo</span>
                                <input type="email" value={email} pattern="[a-zA-Z0-9._%+-]+@ug\.edu\.ec"
                                    className="form-control" placeholder="user@company.com" aria-label="Correo"
                                    aria-describedby="basic-addon1" onChange={handleEmailChange} required />
                                <div className="invalid-feedback">
                                    Ingrese un correo valido
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                                <input type="tel" placeholder="0987654321" value={telefono} pattern="[0-9]{10}"
                                    className="form-control" aria-label="Telefono"
                                    aria-describedby="basic-addon1" onChange={handleTelefonoChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3 has-validation">
                                <span className="input-group-text" id="basic-addon1">Nivel de educacion</span>
                                <select className="form-select" defaultValue={0} onChange={handleEducacionChange} required>
                                    <option disabled value=''>Seleccione un nivel</option>
                                    <option value="1">Escuela</option>
                                    <option value="2">Colegio</option>
                                    <option value="3">Universidad</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3 has-validation">
                                <span className="input-group-text">Promedio</span>
                                <input type="text" pattern="\d+(\.\d{0,2})?" value={promedio}
                                    className="form-control" placeholder="00.00"
                                    onChange={handlePromedioChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <button className="btn btn-primary" type="submit">Agregar</button>
                        </div>
                    </div>
                </form>

            </div >
        </main >
    )

}