import React from 'react';
import { useAuth } from './AuthContext';
import { AiOutlineLogout } from 'react-icons/ai'

function Logout2() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <button onClick={handleLogout}><AiOutlineLogout /></button>
    );
}

export default Logout2;