import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginEstilo.css';

export default function Form() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleContraseñaChange = (event) => {
    setContraseña(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (nombre.trim() === '' || contraseña.trim() === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    // Validar credenciales
    const correoSuperUsuario = 'superuser@example.com';
    const passSuperUsuario = 'sistema1234';

    if (nombre.toLowerCase().trim() === correoSuperUsuario.toLowerCase() && contraseña === passSuperUsuario) {
      navigate('/auth');
    } else {
      alert('Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.');
    }
  };

  return (
    <div className='md:container md:mx-auto h-auto md:h-64 lg:h-72 xl:h-80 w-10/11 max-w-[1000px] p-5 rounded-3xl bg-white border-2 border-gray-100'>
      <h1 className='text-5xl font-semibold'>Bienvenido</h1>
      <p className='font-medium text-lg text-black mt-4'>Por favor ingresa tus datos.</p>
      <form onSubmit={handleSubmit}>
        <div className=''>
          <div>
            <label className='text-lg font-medium'>Nombre</label>
            <input
              className='w-full border-2 border-black rounded-xl p-2 mt-1 bg-transparent'
              type='text'
              value={nombre}
              onChange={handleNombreChange}
              placeholder='Ingresa tu nombre'
            />
          </div>
          <div>
            <label className='text-lg font-medium'>Contraseña</label>
            <input
              className='w-full border-2 border-black rounded-xl p-2 mt-1 bg-transparent'
              type='password'
              value={contraseña}
              onChange={handleContraseñaChange}
              placeholder='Ingresa tu contraseña'
            />
          </div>
          <div className='mt-4 flex flex-col gap-y-4'>
            <button
              type='submit'
              className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-green-600 text-black text-lg font-bold'
            >
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
