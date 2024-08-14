import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const TeacherSidebar = () => {
  const { teacherId } = useParams(); 
  return (
    <div className="h-screen bg-gray-800 text-white w-64">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Teacher Dashboard</h2>
      </div>
      <nav className="mt-10">

        <NavLink
          to="/update-students" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Update student
        </NavLink>

        <NavLink
          to="/delete-students" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Delete student
        </NavLink>
        
        <NavLink 
          to={`/teacher/${teacherId}/students`}
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Student List
        </NavLink>
        
      </nav>
    </div>
  );
};

export default TeacherSidebar;