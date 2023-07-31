import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Curso() {
    const [curso, setCurso] = useState({})


    const router = useRouter()
    const { cursoId } = router.query

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${process.env.URL}/api/curso/${cursoId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            const cursos = await res.json()
            console.log(cursos, 'cursos')
            setCurso(cursos.cursos)
        }
        fetchData()
    }, [cursoId] )

    return (
        <>
            <main className='row container-fluid'>
                <div className="container ">
                    <div className="col-md-4 p-3">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={`/sources/materias-img/clase-informatica.webp`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Informatica</h5>
                                <p className="card-text">Descripcion</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session: session,
        }
    }
}