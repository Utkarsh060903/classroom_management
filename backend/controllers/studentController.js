import User from '../models/userModel.js';
import Classroom from '../models/classroomModel.js';

const getStudentsWithClassrooms = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' }).populate('classroom');

        const studentData = students.map(student => ({
            id: student._id,
            name: student.name,
            classroom: student.classroom ? student.classroom.name : 'No Classroom'
        }));

        res.json({ success: true, students: studentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { getStudentsWithClassrooms };
