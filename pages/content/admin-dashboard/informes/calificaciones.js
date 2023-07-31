

export default function calificaciones({ calificaciones}) {

    return (
        <>
            <main>
                <div className="container">
                    <h1>Calificaciones</h1>
                    <table class="table">
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
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const data = await fetch('http://localhost:3000/api/calificaciones')
    const calificaciones = await data.json()


    return {
        props: {
            calificaciones: calificaciones.calificaciones,
        }
    }
}
