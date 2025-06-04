import React from 'react'

const Card = ({title, subtitle, balance}) => {
  return (
    <div className="rounded bg-gray-300 p-4 flex flex-col items-center justify-center hover:bg-gray-400 hover:cursor-pointer hover:scale-105 transition-all duration-300 shadow-md">
        <h3 className="text-gray-700 font-semibold">{title}</h3>
        {subtitle && <h3 className="text-gray-700">{subtitle}</h3>}
        {balance && <h3 className="text-gray-700 font-semibold">{balance}</h3>}
    </div>
  )
}

export default Card