import User from '../models/userModel.js'; 

const getStudentsInTeachersClassroom = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await User.findById(teacherId).populate('classroom');

    if (!teacher) {
       res.json({ message: 'Teacher not found' });
    }

    if (teacher.role !== 'Teacher') {
      res.json({ message: 'User is not a teacher' });
    }

    const students = await User.find({ classroom: teacher.classroom._id, role: 'Student' });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found in this classroom' });
    }

    res.status(200).json(students);
  } catch (error) {
    res.json({ message: 'Server error', error: error.message });
  }
};

export {getStudentsInTeachersClassroom}