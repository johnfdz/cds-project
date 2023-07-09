import Image from 'next/image'
import { getSession, useSession } from "next-auth/react"

export default function MisCursos({ curso }) {
    return (
        <main className='row container-fluid'>
            <div className="container ">
                {
                    curso.map((curso) => (
                        <div key={curso.materia_id} className="col-md-4 p-3">
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={`/sources/materias-img/clase-informatica.webp`} className="card-img-top" alt={curso.nombre} />
                                <div className="card-body">
                                    <h5 className="card-title">{curso.nombre}</h5>
                                    <p className="card-text">{curso.descripcion}</p>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const id = session.user.id
    console.log(session.user)

    const res = await fetch(`${process.env.URL}/api/curso/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const cursos = await res.json()
    console.log(cursos)
    return {
        props: {
            curso: cursos.cursos,
        }
    }
}
