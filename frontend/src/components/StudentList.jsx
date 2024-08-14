import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://classroom-management-4-3fxk.onrender.com/api/student");
        if (response.data.success) {
          setStudents(response.data.students);
          setError("");
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">
                Student ID
              </th>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">
                Name
              </th>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">
                Classroom
              </th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b text-left">{student.id}</td>
                  <td className="py-3 px-6 border-b text-left">
                    {student.name}
                  </td>
                  <td className="py-3 px-6 border-b text-left">
                    {student.classroom}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-6 border-b text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
