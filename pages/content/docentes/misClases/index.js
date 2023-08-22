import { getSession } from "next-auth/react";
import Link from "next/link";

export default function MisClases({curso}) {
    console.log(curso)
    return (
        <main className='row container-fluid'>
            
            <div className="container ">
                {
                    curso.map((curso) => (
                        <div key={curso.materia_id} className="col-md-4 p-3">
                            <div className="card" style={{ width: '18rem' }}>
                                <img src={`/sources/materias-img/clase-informatica.webp`} className="card-img-top" alt={curso.materia} />
                                <div className="card-body">
                                    <h5 className="card-title"><Link href={`cursos/${curso.materia_id}`}>{curso.materia}</Link></h5>
                                    <p className="card-text text-truncate">{curso.descripcion}</p>
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
    
    const res = await fetch(`${process.env.URL}/api/curso/${id}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: 'docente' })
        })
    const cursos = await res.json()

    if (!session || session.user.role !== 'docente') {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            session: session,
            curso: cursos.cursos[0]
        }
    }
}