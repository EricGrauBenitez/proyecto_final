import React from 'react';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import Logout from './Logout';
import Logout2 from './Logout2';
import { BsFillChatDotsFill } from 'react-icons/bs';


import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="navbar-buttons">
                <button onClick={() => navigate('/')}><AiFillHome /></button>
                <button onClick={() => navigate('/users')}><AiOutlineUser /></button>
                <button onClick={() => navigate('/chat')}><BsFillChatDotsFill /></button>
                <Logout2 />
            </div>
        </nav>
    );
}

export default Navbar;
