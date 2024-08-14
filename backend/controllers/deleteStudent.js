import Classroom from "../models/classroomModel.js";
import User from "../models/userModel.js";

const deleteStudent = async (req, res) => {
    const { teacherId, studentId } = req.params;

    try {
        console.log(`Teacher ID: ${teacherId}, Student ID: ${studentId}`);

        // Find the student and verify they exist
        const student = await User.findById(studentId);
        console.log('Student found:', student);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Find the classroom where the student belongs
        const classroom = await Classroom.findOne({ students: studentId });
        console.log('Classroom found:', classroom);

        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }

        // Verify that the classroom is managed by the teacher
        if (classroom.teacher.toString() !== teacherId) {
            return res.status(403).json({ error: 'Teacher does not manage this classroom' });
        }

        // Remove the student from the classroom
        await Classroom.findByIdAndUpdate(classroom._id, { $pull: { students: studentId } });

        // Delete the student
        await User.findByIdAndDelete(studentId);

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting student:', err);
        // Handle the error and send only one response
        if (!res.headersSent) {
            res.status(400).json({ error: err.message });
        }
    }
};

export { deleteStudent };
