import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const Header = () => {
    const { logOutUser } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogOut = () => {
        logOutUser();
        window.location.href = "/login";
    }

    return (
        <div className='px-10 py-2 flex justify-between item-center'>
            <h1 className='text-md uppercase'>Blog Site</h1>
            <div className='flex items-center justify-center gap-3'>
                {user && <h2>Hello, {user?.username}</h2>}
                {user && <button className='btn btn-error btn-sm text-white' onClick={handleLogOut}>Logout</button>}
            </div>
        </div>
    );
};

export default Header;