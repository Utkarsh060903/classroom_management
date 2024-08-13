import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Principal Dashboard</h2>
      </div>
      <nav className="mt-10">
        <NavLink 
          to="/add-teacher" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Add Teacher
        </NavLink>
        <NavLink 
          to="/add-student" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Add Student
        </NavLink>
        <NavLink 
          to="/assign-teacher" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Assign Teacher
        </NavLink>
        <NavLink 
          to="/assign-student" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Assign Student
        </NavLink>
        <NavLink 
          to="/students-list" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Student List
        </NavLink>
        <NavLink 
          to="/teachers-list" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Teachers List
        </NavLink>
        <NavLink 
          to="/classroom-list" 
          className={({ isActive }) => isActive ? "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Classroom List
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
