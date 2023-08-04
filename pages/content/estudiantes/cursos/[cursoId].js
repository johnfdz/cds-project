import { getSession } from 'next-auth/react'
import { useState } from 'react'

export default function Curso({ cursos, session }) {
    const [curso, setCurso] = useState(cursos[0])

    console.log(session.user)

    return (
        <>
            <main className='row container-fluid'>
                <h2 className='text-center'>{curso.materia}</h2>
                <p className='text-center'>{curso.descripcion}</p>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { cursoId } = context.params;

    const res = await fetch(`${process.env.URL}/api/curso/${cursoId}`)
    const cursos = await res.json()

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
            cursos: cursos.cursos
        }
    }
}