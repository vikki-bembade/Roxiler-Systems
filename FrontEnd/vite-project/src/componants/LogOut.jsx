import React from 'react'
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <div>
            <button onClick={handleLogout} className='bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700'>Log Out</button>
        </div>
    )
}

export default LogOut