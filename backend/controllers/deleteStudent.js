import Classroom from "../models/classroomModel.js";
import User from "../models/userModel.js";

const deleteStudent = async (req, res) => {
    const { teacherId, studentId } = req.params;

    try {
        console.log(`Teacher ID: ${teacherId}, Student ID: ${studentId}`);
        const student = await User.findById(studentId);
        console.log('Student found:', student);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const classroom = await Classroom.findOne({ students: studentId });
        console.log('Classroom found:', classroom);

        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }

        if (classroom.teacher.toString() !== teacherId) {
            return res.status(403).json({ error: 'Teacher does not manage this classroom' });
        }

        
        await Classroom.findByIdAndUpdate(classroom._id, { $pull: { students: studentId } });

    
        await User.findByIdAndDelete(studentId);

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting student:', err);
        
        if (!res.headersSent) {
            res.status(400).json({ error: err.message });
        }
    }
};

export { deleteStudent };
