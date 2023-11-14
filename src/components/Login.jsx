import React, { useState } from 'react';
import '../styles/LoginEstilo.css';

export default function Form() {
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

    if (nombre === 'Joaquin' && contraseña === '123456') {
      alert('Inicio de sesión exitoso');
      
    } else {
      alert('Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.');
    }
  };

  return (
    <div className='w-11/12 max-w-[1000px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
      <h1 className='text-5xl font-semibold'>Bienvenido</h1>
      <p className='font-medium text-lg text-black mt-4'>Por favor ingresa tus datos.</p>
      <form onSubmit={handleSubmit}>
        <div className='mt-8'>
          <div>
            <label className='text-lg font-medium'>Nombre</label>
            <input
              className='w-full border-2 border-black rounded-xl p-4 mt-1 bg-transparent'
              type='text'
              value={nombre}
              onChange={handleNombreChange}
              placeholder='Ingresa tu nombre'
            />
          </div>
          <div>
            <label className='text-lg font-medium'>Contraseña</label>
            <input
              className='w-full border-2 border-black rounded-xl p-4 mt-1 bg-transparent'
              type='password'
              value={contraseña}
              onChange={handleContraseñaChange}
              placeholder='Ingresa tu contraseña'
            />
          </div>
          <div className='mt-8 flex flex-col gap-y-4'>
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
