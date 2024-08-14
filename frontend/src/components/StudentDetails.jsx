import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentDetails = () => {
  const { studentId } = useParams();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentResponse = await axios.get(`http://localhost:5000/api/students/${studentId}/students`);
        setStudents(studentResponse.data);
      } catch (err) {
        setError('Error fetching students');
        console.error(err); 
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students in Your Classroom</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">Student ID</th>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">Name</th>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b text-left">{student._id}</td>
                  <td className="py-3 px-6 border-b text-left">{student.name}</td>
                  <td className="py-3 px-6 border-b text-left">{student.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-6 border-b text-center">No other students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
