import Image from 'next/image'
import { getSession, useSession } from "next-auth/react"

export default function MisCursos() {
    return (
        <main>
            <div className="container ">
                <div className="text-center">
                    <h1>Mis Cursos</h1>
                    <Image className={'img-fluid rounded'} src={'/sources/estudiantes.jpg'} width={'1000'} height={'750'} alt='Universitarios' ></Image>
                </div>
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
