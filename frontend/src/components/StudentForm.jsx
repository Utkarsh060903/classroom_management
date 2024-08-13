import React, { useState } from 'react';
import axios from 'axios'

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: " ",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData)
  
        if (response.ok) {
          const data = await response.json();
          alert('Teacher added successfully!');
          // Optionally clear the form after submission
          setFormData({
            name: '',
            email: '',
            password: '',
            role: '',
          });
          response.json({success: true, message: "teacher added successfully"})
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the teacher');
      }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
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
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          Add Teacher
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
