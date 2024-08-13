import { useState, useEffect } from "react";
import axios from "axios";

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/classroom-list");
        if (response.data.success) {
          setClassrooms(response.data.classrooms);
          setError("");
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching the classrooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">classrooms List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">
                Classroom ID
              </th>
              <th className="py-3 px-6 border-b text-left bg-gray-100 font-semibold">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {classrooms.length > 0 ? (
              classrooms.map((classroom) => (
                <tr key={classroom.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b text-left">{classroom._id}</td>
                  <td className="py-3 px-6 border-b text-left">
                    {classroom.name}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 px-6 border-b text-center">
                  No classrooms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassroomList;
