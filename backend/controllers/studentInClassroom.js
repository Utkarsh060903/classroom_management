import Student from '../models/studentModel.js';
import Teacher from '../models/teacherModel.js'; // Assuming there's a Teacher model

export const getStudentsInClassroom = async (req, res) => {
  try {
    // Fetch the teacher's ID from the authenticated user (stored in req.user after auth middleware)
    // console.log("utkarsh" , req)
    const teacherId = req.user._id;

    // Fetch the teacher's classroomId from the Teacher model
    const teacher = await Teacher.findById(teacherId).populate('classroom');
    
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    const classroomId = teacher.classroom._id;

    // Fetch students who belong to this classroom
    const students = await Student.find({ classroom: classroomId });

    if (!students.length) {
      return res.status(404).json({ success: false, message: 'No students found in this classroom' });
    }

    res.json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
