import { getSession } from "next-auth/react";

export default function MisClases() {
    return (
        <main>
            <div className="container ">
                <div className="text-center">
                    <h1>Mis clases</h1>
                </div>
            </div>
        </main>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session || session.role !== 'docente') {
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
        }
    }
}