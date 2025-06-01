import React, { useState } from 'react'
import { useAuth } from '../hooks/AuthContext'
const {login, logout, isAuthenticated, user} = useAuth();

function HomePage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(username, password);
  }
  const handleUsernameChange = (e)=>{
    setUsername(e.target.value);
  }
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }
  const handleRegister = (e)=>{
    e.preventDefault();
    console.log(username, password);
  }

  return (
    <div className='bg-gray-800 h-screen w-screen p-10 overflow-hidden'>
      <div className='rounded-xl border-2 border-gray-300 w-full h-full flex flex-col justify-center items-center'>
        <h1 className='m-6 text-5xl text-center text-extrabold text-gray-300 '>Login</h1>
        <form className="mx-auto flex flex-col justify-center items-center space-y-4 w-50% max-w-md p-6 text-gray-300">
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
          <button className='text-gray-300 bg-gray-700 p-3 px-6 rounded-xl mt-5 hover:bg-black hover:cursor-pointer' type='button' onClick={handleSubmit}>Login</button>
          <button className='text-gray-300 bg-gray-700 p-3 px-6 rounded-xl mt-1 hover:bg-black hover:cursor-pointer' type='button' onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default HomePage