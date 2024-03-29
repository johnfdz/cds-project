import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';


export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn('credentials', { username: username, password: password, redirect: true, callbackUrl: '/content' });
    console.log('Iniciar sesión con:', username, password);
  };

  return (

    <div className="container-fluid" >
      <div className='d-flex justify-content-center  mt-5'>
        <div className='card p-3'>
          <div className="card-header text-center">
            <Image className="mx-auto" src={"/sources/logo.png"} width='100' height='100' alt="Logo UG" />
            <h2 className="text-center">Centro artesanal UG</h2>
          </div>
          <div className=''>
            <form className="">
              <div className="mb-3">
                <label className="exampleFormControlInput1" htmlFor="username">Usuario:</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-3">
                <label className="exampleFormControlInput1" htmlFor="password">Contraseña:</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="text-center row gap-3">
                <div className='col'>
                  <button
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Ingresar
                  </button>
                </div>
                <div className='col'>
                  <button className="btn btn-primary" onClick={() => router.push('/auth/registro')}>Registrarse</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/content',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}


Login.getLayout = function PageLayout(page) {
  return (
    <div>
      {page}
    </div>
  )
}