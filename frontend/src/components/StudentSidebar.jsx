import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const StudentSidebar = () => {
  const { studentId } = useParams(); 

  return (
    <div className="h-screen bg-gray-800 text-white w-64">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Student Dashboard</h2>
      </div>
      <nav className="mt-10">

        <NavLink
          to={`/student/${studentId}/classroom-students`}
          className={({ isActive }) => isActive ? 
            "block py-2.5 px-4 bg-gray-700 rounded text-white font-semibold" : 
            "block py-2.5 px-4 text-gray-300 hover:bg-gray-700 rounded"}>
          Other Students in Classroom
        </NavLink>
        
      </nav>
    </div>
  );
};

export default StudentSidebar;
