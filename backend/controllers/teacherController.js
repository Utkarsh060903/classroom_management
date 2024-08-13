import User from '../models/userModel.js';
import Classroom from '../models/classroomModel.js';

const getTeacherWithClassroom = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' }).populate('classroom');

        const teachertData = teachers.map(teacher => ({
            id: teacher._id,
            name: teacher.name,
            classroom: teacher.classroom ? teacher.classroom.name : 'No Classroom'
        }));

        res.json({ success: true, teachers: teachertData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { getTeacherWithClassroom };
