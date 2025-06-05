import React from 'react'
import { useParams } from 'react-router-dom';


const WalletPage = () => {

    const {id} = useParams();

  return (
    <div>WalletPage</div>
  )
}

export default WalletPage