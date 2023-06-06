import Link from 'next/link';
import style from '@/styles/Navbar.module.css';
import Image from 'next/image';


import { signOut, useSession } from 'next-auth/react';


function Navbar() {
    const { data: session, status } = useSession();

    return (
        <>
            <nav className={`navbar navbar-expand-lg bg-body-tertiary ${style.navbar}`}>
                <div className='container-fluid'>
                    <Image className='d-inline-block align-text-top' src='/sources/logo.png' width={45} height={50} />
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarScroll" style={{position: 'relative'}}>
                        <ul className={`navbar-nav me-auto mb-2 mb-lg-0 navbar-nav-scroll ${!session && status === 'loading' ? 'loading' : 'loaded'}`}>
                            <li className='nav-item'>
                                <Link className='nav-link ' href='/'>
                                    Home
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' href='/modulos'>
                                    Modulos
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' href='/registroPersona'>
                                    Registro
                                </Link>
                            </li>
                            {session && (<li className='nav-item'>
                                <Link className='nav-link' href='/api/auth/signout' onClick={e => {
                                    e.preventDefault();
                                    signOut({ callbackUrl: '/login' });
                                }}>
                                    Sign Out
                                </Link>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;