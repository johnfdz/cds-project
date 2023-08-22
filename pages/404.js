import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

export default function PageNotFound() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setSession(session);
    }

    fetchSession();
  }, []);

  if (!session) {
    return (
      <main>
        <h1>Intenta iniciar sesión</h1>
        <Link href={'/auth/login'} className='btn btn-primary'>Iniciar sesión</Link>
      </main>
    );
  } else {
    return (
      <main>
        <h1>No tienes acceso a esta página</h1>
        <Link href={'/'} className='btn btn-primary'>Regresar</Link>
      </main>
    );
  }
}