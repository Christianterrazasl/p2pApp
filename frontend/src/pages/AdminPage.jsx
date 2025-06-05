import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate('/login');
        }
        if(user.isAdmin == false){
            navigate('/not-auth');
        }
    }, []);

  return (
    <div>
        <h1>Admin Page</h1>
    </div>
  )
}

export default AdminPage