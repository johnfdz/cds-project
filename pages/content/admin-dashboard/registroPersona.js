import { getSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import RegistroMaestros from "../../../components/interfaces/RegistroMaestros"
import RegistroEstudiantes from "../../../components/interfaces/RegistroEstudiantes"


export default function Estudiantes() {
    const [entidades, setEntidades] = useState('Estudiante')
    const router = useRouter()

    const handleEntidadesChange = (e) => {
        setEntidades(e.target.value)
    }

    const entidad = () => {
        if (entidades === 'Estudiante') {
            return <RegistroEstudiantes />
        } else if (entidades === 'Docente') {
            return <RegistroMaestros />
        }
    }

    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            console.log(session)
            if (!session) {
                router.push('/login');
                return null
            }
        }
        securePage();
        entidad();
    }, []);

    return (
        <main>
            <div className="container">
                <>
                    <div>
                        {
                            <RegistroMaestros />
                        }
                    </div>
                </>
            </div>
        </main>
    )
}
