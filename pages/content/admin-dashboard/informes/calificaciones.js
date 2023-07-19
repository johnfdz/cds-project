import { getServerSideProps } from "../modulos"


export default function calificaciones() {

    return (
        <>
            <main>
                <div className="container">
                    <h1>Calificaciones</h1>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(){
    const calificaciones = await fetch('http://localhost:3000/api/calificaciones')
    return{
        props:{
            materias: materias,
            modulos: modulos
        }
    }
}
