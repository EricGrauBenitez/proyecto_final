import React from 'react';
import { useAuth } from './AuthContext';

function Logout2() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout2;