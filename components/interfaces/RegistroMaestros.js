

export default function RegistroMaestros() {
    return (
        <main>
            <div className="container">
                <h1>Ficha docentes</h1>
                <form className="row">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Cedula</span>
                                <input type="text"
                                    className="form-control" placeholder="Ingrese cedula" aria-label="Cedula"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                                <input type="text"
                                    className="form-control" placeholder="Ingrese nombre" aria-label="Nombre"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Apellido</span>
                                <input type="text"
                                    className="form-control" placeholder="Ingrese Apellido" aria-label="Apellido"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Edad</span>
                                <input type="number"
                                    className="form-control" placeholder="ingrese la edad" aria-label="Edad"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Direccion</span>
                                <input type="text"
                                    className="form-control" placeholder="Ingrese direccion" aria-label="Direccion"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Correo</span>
                                <input type="email"
                                    className="form-control" placeholder="Ingrese correo" aria-label="Correo"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                                <input type="tel"
                                    className="form-control" placeholder="Ingrese telefono" aria-label="Telefono"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Tipo de contrato</span>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected value=''>Seleccionar</option>
                                    <option value="1">Nombramiento</option>
                                    <option value="2">Contrato</option>
                                    <option value="3">Ocacional</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Promedio</span>
                                <input type="number"
                                    className="form-control" placeholder="Ingrese nota 1" aria-label="Nota1"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Nota 2</span>
                                <input type="number"
                                    className="form-control" placeholder="Ingrese nota 2" aria-label="Nota2"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            <button className="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </form>
            </div >
        </main >
    )
}