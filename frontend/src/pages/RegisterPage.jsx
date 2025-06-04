import React from 'react'
import FsLayout from '../layouts/FsLayout'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleUsernameChange = (e)=>{
        setUsername(e.target.value);
    }
    const handlePasswordChange= (e)=>{
        setPassword(e.target.value);
    }
    const handleCancel = (e)=>{
        e.preventDefault();
        navigate("/login");
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(username, password);
        axios.post('http://localhost:3000/api/register', {username, password})
        .then(response => {
            if(response.status === 200){
                navigate('/login');
            }else{
                setError(true);
            }
        })
        .catch(error => {
            console.log(error);
        })
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
            {error && <p className='text-red-500'>Error al registrar usuario</p>}
          </div>
          <button className='w-full text-gray-300 bg-gray-700 p-3 px-6 rounded-xl mt-5 hover:bg-black hover:cursor-pointer' type='button' onClick={(e)=>handleSubmit(e)}>Registrarse</button>
          <button className='w-full text-gray-300 bg-gray-700 p-3 px-6 rounded-xl mt-1 hover:bg-black hover:cursor-pointer' type='button' onClick={(e)=>handleCancel(e)}>Cancelar</button>
        </form>
    </FsLayout>
  )
}

export default RegisterPage