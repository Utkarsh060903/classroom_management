// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = ({ setCurrentUser }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('');  // Added state for role
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password, role });
//             if (response.data.success) {
//                 const { token, user } = response.data;

//                 // Calculate expiration time (3 days from now)
//                 const expiryTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds

//                 localStorage.setItem('token', JSON.stringify({ token, expiry: expiryTime }));
//                 setCurrentUser(user);

//                 // Redirect based on user role
//                 if (user.role === 'Principal') {
//                     navigate('/dashboard/principal');
//                 } else if (user.role === 'Teacher') {
//                     navigate('/dashboard/teacher');
//                 } else if (user.role === 'Student') {
//                     navigate('/dashboard/student');
//                 }
//             } else {
//                 setError(response.data.message);
//             }
//         } catch (err) {
//             setError('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md bg-white p-8 shadow-lg">
//                 <h2 className="text-2xl font-bold mb-6">Login</h2>
//                 {error && <div className="text-red-500 mb-4">{error}</div>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Email</label>
//                         <input 
//                             type="email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                             className="w-full px-3 py-2 border border-gray-300 rounded" 
//                             required 
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Password</label>
//                         <input 
//                             type="password" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} 
//                             className="w-full px-3 py-2 border border-gray-300 rounded" 
//                             required 
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Role</label>
//                         <select 
//                             value={role} 
//                             onChange={(e) => setRole(e.target.value)} 
//                             className="w-full px-3 py-2 border border-gray-300 rounded" 
//                             required
//                         >
//                             <option value="">Select Role</option>
//                             <option value="Principal">Principal</option>
//                             <option value="Teacher">Teacher</option>
//                             <option value="Student">Student</option>
//                         </select>
//                     </div>
//                     <button 
//                         type="submit" 
//                         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password, role });
            if (response.data.success) {
                const { token, user } = response.data;
    
                const expiryTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);  
                localStorage.setItem('token', JSON.stringify({ token, expiry: expiryTime }));
                setCurrentUser(user);
    

                if (user.role === 'Principal') {
                    navigate('/dashboard/principal');
                } else if (user.role === 'Teacher') {
                    navigate(`/dashboard/teacher/${user.id}`);
                } else if (user.role === 'Student') {
                    navigate(`/dashboard/student/${user.id}`);
                }
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded" 
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Principal">Principal</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
