import React from 'react'
import FsLayout from '../layouts/FsLayout'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange= (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = ()=>{
        console.log(username, password)
    }

    

  return (
    <FsLayout>
        <h1 className='m-6 text-5xl text-center text-extrabold text-gray-300 '>Register</h1>
        <form className="mx-auto flex flex-col justify-center items-center space-y-4 w-1/2 max-w-md p-6 text-gray-300">
          <div className="flex flex-col w-full">
            <label className="mb-2">Username: </label>
            <input 
              type="text" 
              placeholder='Ingresa tu Username'
              className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-2">Contrasena: </label>
            <input 
              type="password" 
              placeholder='Ingresa tu contrasena'
              className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className='w-full text-gray-300 bg-gray-700 p-3 px-6 rounded-xl mt-5 hover:bg-black hover:cursor-pointer' type='button' onClick={handleSubmit}>Registrarse</button>
          <button className='w-full text-gray-300 bg-gray-700 p-3 px-6 rounded-xl mt-1 hover:bg-black hover:cursor-pointer' type='button' onClick={navigate("/login")}>Cancelar</button>
        </form>
    </FsLayout>
  )
}

export default RegisterPage