// import User from '../models/userModel.js'; 

// const studentDetails = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     // Find the student and their classroom
//     const student = await User.findById(studentId).populate('classroom');

//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     // Find other students in the same classroom, excluding the current student
//     const students = await User.find({
//       classroom: student.classroom._id,
//       role: 'Student',
//       _id: { $ne: studentId } // Exclude the current student
//     });

//     if (!students || students.length === 0) {
//       return res.status(404).json({ message: 'No other students found in this classroom' });
//     }

//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// export { studentDetails };




import User from '../models/userModel.js'; 

const studentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student and their classroom
    const student = await User.findById(studentId).populate('classroom');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find other students in the same classroom, excluding the current student
    const students = await User.find({
      classroom: student.classroom._id,
      role: 'Student',
      _id: { $ne: studentId } // Exclude the current student
    });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No other students found in this classroom' });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { studentDetails };