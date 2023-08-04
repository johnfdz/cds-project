

export default function TablaCalificaciones({ calificaciones }) {
    return (
        <div className="container">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Materia</th>
                        <th scope="col">Docente</th>
                        <th scope="col">Calificación</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        calificaciones.map((calificacion, index) => (
                            <tr key={calificacion.id_calificacion}>
                                <th scope="row">{index + 1}</th>
                                <td>{calificacion.nombre_est}</td>
                                <td>{calificacion.nombre}</td>
                                <td>{calificacion.nombre_doc}</td>
                                <td>{calificacion.calificacion}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
