import { getSession } from 'next-auth/react';

export default function salarios({ salarios }) {

    return (
        <>
            <div className="container">
                <h1>Salarios</h1>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Cedula</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Tipo de contrato</th>
                                <th scope="col">Salario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                salarios.map((salario, index) => (
                                    <tr key={index}>
                                        <td>{salario.cedula}</td>
                                        <td>{salario.nombre}</td>
                                        <td>{salario.contrato}</td>
                                        <td>{salario.sueldo}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const res = await fetch('http://localhost:3000/api/salarios');
    const salarios = await res.json();

    if (!session && session.user.rol !== 'admin') {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    return {
        props: {
            session,
            salarios: salarios.salarios
        }
    }
}