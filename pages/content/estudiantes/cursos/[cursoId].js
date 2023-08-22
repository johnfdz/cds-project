import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function Curso({ cursos, contenido, actividades }) {
    const [curso, setCurso] = useState(cursos)

    if (!curso) {
        return (
            <main className='container'>
                <h1>No hay cursos</h1>
            </main>)
    }
    console.log(curso)


    return (
        <>
            <main className='container '>
                <div className='row row-gap-3'>
                    <div style={{ backgroundColor: "#ced4da", borderRadius: "25px", padding: "10px" }}>
                        <h2 className='text-center'>{curso.materia}</h2>
                        <p>{curso.descripcion}</p>
                    </div>
                    <div class="container text-center">
                        <div class="row">
                            <div class="col">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                                        Docente
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">{curso.docente}</a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                                        Calificacion
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">{curso.calificacion}</a>
                                </div>
                            </div>
                            <div class="col">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                                        Calificacion
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action">{curso.calificacion}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <h3>Contenido</h3>
                            <ul className='list-group'>
                                {
                                    contenido.map((contenido) => (
                                        <li className='list-group-item' key={contenido.id_contenido}>
                                            <Link href={`/content/estudiantes/contenidos/${contenido.id_contenido}`}>
                                                {contenido.titulo}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className='col-12 col-md-6'>
                            <h3>Actividades</h3>
                            <ul className='list-group'>
                                {
                                    actividades.map((actividad) => (
                                        <li className='list-group-item' key={actividad.id_actividad}>
                                            <Link href={`/content/estudiantes/actividades/${actividad.id_actividad}`}>
                                                {actividad.titulo}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { cursoId } = context.params;

    const res = await fetch(`${process.env.URL}/api/curso/${cursoId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: 'estudiante' })
        }
    )
    const cursos = await res.json()

    const contenido = await fetch(`${process.env.URL}/api/curso/contenido`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ curso_id: cursoId, type: 'GET' })
    }).then(res => res.json())

    const actividades = await fetch(`${process.env.URL}/api/curso/actividades`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ curso_id: cursoId, type: 'GET' })
    }).then(res => res.json())

    if (!session || session.user.role !== 'estudiante') {
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
            cursos: cursos.cursos[0],
            contenido: contenido.contenido[0],
            actividades: actividades.actividades[0]
        }
    }
}