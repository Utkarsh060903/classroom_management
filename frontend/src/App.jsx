import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrincipalDashboard from './components/PrincipalDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import TeacherForm from './components/TeacherForm';
import ClassroomForm from './components/ClassroomForm';
import StudentForm from './components/StudentForm';
import AssignTeacher from './components/AssignTeacher';
import TeacherList from './components/TeacherList';
import StudentList from './components/StudentList';
import AssignStudent from './components/AssignStudents';
import Login from './components/Login';
import Home from './components/Home';
import ClassroomList from './components/ClassroomList'

import { decodeToken, isTokenExpired } from './utils/auth'
import StudentsInClassroomList from './components/StudentInClassroom';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Restore user state from localStorage
    const tokenData = JSON.parse(localStorage.getItem('token'));
    if (tokenData && !isTokenExpired()) {
      // Decode token to get user info if needed
      const user = decodeToken(tokenData.token); // Implement decodeToken function based on your JWT
      setCurrentUser(user);
    }
  }, []);

  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="flex-grow p-6 bg-gray-100">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path='/dashboard/principal' element={<PrincipalDashboard />} />
          <Route path='/dashboard/student' element={<StudentDashboard />} />
          <Route path='/dashboard/teacher' element={<TeacherDashboard />} />
          <Route path='/add-teacher' element={<TeacherForm />} />
          <Route path='/add-classroom' element={<ClassroomForm />} />
          <Route path='/add-student' element={<StudentForm />} />
          <Route path='/assign-teacher' element={<AssignTeacher />} />
          <Route path='/assign-student' element={<AssignStudent />} />
          <Route path='/teachers-list' element={<TeacherList />} />
          <Route path='/students-list' element={<StudentList />} />
          <Route path='/classroom-list' element={<ClassroomList />} />
          <Route path='/teacher/students-list' element={<StudentsInClassroomList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
