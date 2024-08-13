import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import TeacherForm from './TeacherForm';
import AssignTeacher from './AssignTeacher';
import StudentForm from './StudentForm';
import AssignStudent from './AssignStudents';
import TeacherList from './TeacherList';
import StudentList from './StudentList';
import ClassroomList from './ClassroomList';

const PrincipalDashboard = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-grow p-6 bg-gray-100'>
                <Routes>
                    <Route path="/add-teacher" element={<TeacherForm />} />
                    <Route path="/add-student" element={<StudentForm />} />
                    <Route path="/assign-teacher" element={<AssignTeacher />} />
                    <Route path="/assign-student" element={<AssignStudent />} />
                    <Route path="/teachers-list" element={<TeacherList />} />
                    <Route path="/students-list" element={<StudentList />} />
                    <Route path="/classroom-list" element={<ClassroomList />} />
                </Routes>
            </div>
        </div>
    );
};

export default PrincipalDashboard;
