import React, { useState } from 'react';
import axios from 'axios'

const AssignTeacher = () => {
  const [formData, setFormData] = useState({
    teacherId: "",
    classroomId: ""
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
        const response = await axios.post('http://localhost:5000/api/classrooms/assign-teacher', formData)
  
        if (response.ok) {
          const data = await response.json();
          alert('Teacher added successfully!');
          setFormData({
           teacherId: "",
           classroomId: ""
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
      <h2 className="text-2xl font-bold mb-4">Assign Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
           Teacher's ID
          </label>
          <input 
            type="text" 
            name="teacherId" 
            id="teacerId" 
            value={formData.teacherId} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Classroom's ID
          </label>
          <input 
            type="text" 
            name="classroomId" 
            id="classroomId" 
            value={formData.classroomId} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          Assign Teacher
        </button>
      </form>
    </div>
  );
};

export default AssignTeacher;

