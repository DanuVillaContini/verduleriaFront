import * as React from 'react';
import '../styles/LoginEstilo.css';

export default function Form () {
  return (
    <div className=' w-11/12 max-w-[1000px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
      <h1 className='text-5xl font-semibold'>Bienvenido</h1>
      <p className='font-medium text-lg text-black mt-4'>Porfavor ingresa tus datos.</p>
      <div className='mt-8'>
        <div>
          <label className='text-lg font-medium'>Nombre</label>
          <input
            className='w-full border-2 border-black rounded-xl p-4 mt-1 bg-transparent'
            placeholder='Ingresa tu nombre'
          />
        </div>
        <div>
        <label className='text-lg font-medium'>Contraseña</label>
          <input
            className='w-full border-2 border-black rounded-xl p-4 mt-1 bg-transparent'
            type='password'
            placeholder='Ingresa tu contraseña'
          />
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
        <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-green-600 text-black text-lg font-bold'>Ingresar</button>
        </div>
      </div>
    </div>
  )
}