import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({title, subtitle, balance, id, symbol}) => {

  const navigate = useNavigate();
  

  return (
    <div onClick={()=>navigate(`/wallet/${id}`)} className="rounded bg-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-400 hover:cursor-pointer hover:scale-105 transition-all duration-300 shadow-md">
        <h3 className="text-gray-700 font-semibold">{title}</h3>
        <h3 className="text-gray-700">{subtitle}</h3>
        <h3 className="inline text-gray-700 font-semibold">{balance} {symbol}</h3>
    </div>
  )
}

export default Card