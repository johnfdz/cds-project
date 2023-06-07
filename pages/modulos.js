import { useState } from 'react';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

export default function Modulos({ modulos }) {
    const [activeTab, setActiveTab] = useState('modulo1');

    console.log(modulos)

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <main>
            <div className="container">
                <ul className="nav nav-pills nav-fill p-3">
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'modulo1' ? 'active' : ''}`}
                            onClick={() => handleTabClick('modulo1')} aria-current="page" href="#">Modulo 1</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'modulo2' ? 'active' : ''}`}
                            onClick={() => handleTabClick('modulo2')} href="#">Modulo 2</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'modulo3' ? 'active' : ''}`}
                            onClick={() => handleTabClick('modulo3')} href="#">Modulo 3</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div
                        className={`tab-pane fade ${activeTab === 'modulo1' ? 'show active' : ''}`}
                        id="modulo1"
                    >
                        <h1>Materias</h1>
                        <ul class="list-group">
                            {
                                modulos
                                    .filter(modulo => modulo.modulo_id === 1)
                                    .map(modulo =>
                                    (
                                        <div key={modulo.id_modulo}>
                                            <li className='list-group-item'>{modulo.nombre}</li>
                                        </div>
                                    )
                                    )
                            }
                        </ul>
                    </div>
                    <div
                        className={`tab-pane fade ${activeTab === 'modulo2' ? 'show active' : ''}`}
                        id="modulo2"
                    >
                        <h1>Materias</h1>
                        <ul class="list-group">
                            {
                                modulos
                                    .filter(modulo => modulo.modulo_id === 2)
                                    .map(modulo =>
                                    (
                                        <div key={modulo.id_modulo}>
                                            <li className='list-group-item'>{modulo.nombre}</li>
                                        </div>
                                    )
                                    )
                            }
                        </ul>
                    </div>
                    <div
                        className={`tab-pane fade ${activeTab === 'modulo3' ? 'show active' : ''}`}
                        id="modulo3"
                    >
                        <h1>Materias</h1>
                        <ul class="list-group">
                            {
                                modulos
                                    .filter(modulo => modulo.modulo_id === 3)
                                    .map(modulo =>
                                    (
                                        <div key={modulo.id_modulo}>
                                            <li className='list-group-item'>{modulo.nombre}</li>
                                        </div>
                                    )
                                    )
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </main >
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const data = await fetch('http://localhost:3000/api/modulos');
    const modulos = await data.json();

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callbackUrl=${process.env.URL}/modulos`,
                permanent: false,
            },
        }
    }
    return {
        props: {
            modulos: modulos.data,
        }
    }
}
