import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchteachers = async () => {
      try {
        const response = await axios.get("https://classroom-management-4-3fxk.onrender.com/api/teacher");
        if (response.data.success) {
          setTeachers(response.data.teachers);
          setError("");
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the teachers.");
      } finally {
        setLoading(false);
      }
    };

    fetchteachers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Teachers List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b text-left ">Teacher ID</th>
              <th className="py-3 px-6 border-b text-left ">Name</th>
              <th className="py-3 px-6 border-b text-left ">Classroom</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b text-left ">{teacher.id}</td>
                  <td className="py-3 px-6 border-b text-left ">{teacher.name}</td>
                  <td className="py-3 px-6 border-b text-left ">{teacher.classroom}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-6 border-b text-center">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;
