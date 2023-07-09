import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter} from "next/router";

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = new useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar al usuario
    console.log('Registrar usuario:', name, email, password);
  };

  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      console.log(session)
      if (session) {
        await router.push('/');
      } 
    }
    securePage();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4">Registro</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm" htmlFor="name">Nombre:</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm" htmlFor="email">Email:</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm" htmlFor="password">Contraseña:</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Registro;
