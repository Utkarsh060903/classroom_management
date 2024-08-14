import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null); 
        navigate('/'); 
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    {currentUser ? (
                        currentUser.role === 'Teacher' && currentUser.classroom
                            ? `Classroom: ${currentUser.classroom}`
                            : currentUser.role === 'Student' && currentUser.classroom
                            ? `Classroom: ${currentUser.classroom}`
                            : 'Classroom Management'
                    ) : (
                        'Classroom Management'
                    )}
                </div>
                <div>
                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-white">
                                Hello, {currentUser.name}
                                {currentUser.role === 'Teacher' || currentUser.role === 'Student' ? ` - ${currentUser.classroom}` : ''}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
