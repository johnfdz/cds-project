import Link from 'next/link';
import style from '@/styles/Navbar.module.css';
import Image from 'next/image';
import { useState } from 'react';

import { signOut, useSession } from 'next-auth/react';


export default function Navbar( {nombre}) {
    const { data: session, status } = useSession();
    const [name, setName] = useState('')

    const ses = () => {
        if (session) {
            return session.user.role;
        }
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg bg-body-tertiary ${style.navbar}`} id='navbarID'>
                <div className='container-fluid'>
                    <Image className='d-inline-block align-text-top' src='/sources/logo.png' width={45} height={50} />
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarScroll" style={{ position: 'relative' }}>
                        <ul className={`navbar-nav me-auto mb-2 mb-lg-0 navbar-nav-scroll d-flex justify-content-between ${!session && status === 'loading' ? 'loading' : 'loaded'}`}>
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link ' href='/content'>
                                        Inicio
                                    </Link>
                                </li>
                                {ses() === 'admin' && (
                                    <>
                                        <li className='nav-item'>
                                            <Link className='nav-link' href='/content/admin-dashboard/modulos'>
                                                Modulos
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' href='/content/admin-dashboard/registroPersona'>
                                                Registro
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Gestion
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Docentes</a></li>
                                                <li><a className="dropdown-item" href="#">Aula Virtual</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Informes
                                            </a>
                                            <ul className="dropdown-menu">
                                                <Link className='dropdown-item' href='/content/admin-dashboard/informes/calificaciones'> Calificaciones </Link>
                                                <li><hr className="dropdown-divider" /></li>
                                                <Link className='dropdown-item' href='/content/admin-dashboard/informes/salarios'> Salarios </Link>
                                            </ul>
                                        </li>
                                    </>
                                )}
                                {ses() === 'estudiante' && (
                                    <>
                                        <li className='nav-item'>
                                            <Link className='nav-link' href='/content/estudiantes/cursos'>
                                                Mis cursos
                                            </Link>
                                        </li>
                                        <li className='nav-item'>
                                            <Link className='nav-link' href='/content/estudiantes/registroMaterias'>
                                                Cursos
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {ses() === 'docente' && (
                                    <>
                                        <li className='nav-item'>
                                            <Link className='nav-link' href='/content/docentes/misClases'>
                                                Mis clases
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        </ul>
                        <>
                            {/* <div className='d-flex'>
                                Bienvendio {name}
                            </div> */}
                            {session && (
                                <Link className='nav-link d-flex' href='/api/auth/signout' onClick={e => {
                                    e.preventDefault();
                                    signOut({ callbackUrl: '/auth/login' });
                                }}>
                                    Cerrar sesión
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </nav>
        </>
    );
}

