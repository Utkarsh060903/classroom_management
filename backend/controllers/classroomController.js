import mongoose from "mongoose"
import Classroom from "../models/classroomModel.js"
import User from "../models/userModel.js"

const createClassroom = async(req,res) => {
    const {name, startTime, endTime, days} = req.body

    try{
        const classroom = new Classroom({
            name, startTime, endTime, days
        })

        await classroom.save()
        res.json({success: true, message: "Classroom successfully created", classroom})
    } catch(error){
        console.log(error)
        res.json({success: false, message: "error"})
    }
}

const assignTeacher = async(req,res) => {
    const {classroomId, teacherId} = req.body

    try{
        if(!mongoose.Types.ObjectId.isValid(classroomId) || !mongoose.Types.ObjectId.isValid(teacherId)){
            res.json({success: false, message: "Invalid classroom or teacher ID"}) 
        }

        const classroom = await Classroom.findById(classroomId)
        if(!classroom){
            res.json({success: false, message: "Classroom not found"})
        }

        const teacher = await User.findById(teacherId)
        if(!teacher || teacher.role !== 'Teacher'){
            res.json({success: false, message: "Teacher not found"})
        } 

        if (teacher.classroom) {
             res.json({ success: false, message: "Teacher is already assigned to a classroom" });
        }

        classroom.teacher = teacherId;
        teacher.classroom = classroomId;

        await classroom.save();
        await teacher.save();
        
        res.json({ success: true, message: "Teacher assigned to classroom successfully", classroom });

    } catch(error){
        console.error(error);
        res.json({ success: false, message: "Server error" });
    }
}

const assignStudents = async (req, res) => {
    const { classroomId, studentId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(classroomId) || !mongoose.Types.ObjectId.isValid(studentId)) {
            res.json({ success: false, message: "Invalid classroom or student ID" });
        }

        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            res.json({ success: false, message: "Classroom not found" });
        }

        const student = await User.findById(studentId);
        if (!student || student.role !== 'Student') {
            res.json({ success: false, message: "Student not found or not a student" });
        }

        if (student.classroom) {
            res.json({ success: false, message: "Student is already assigned to a classroom" });
        }

        student.classroom = classroomId;
        await student.save();

        if (!classroom.students.includes(studentId)) {
            classroom.students.push(studentId);
            await classroom.save();
        }

        res.json({ success: true, message: "Student assigned to classroom successfully", classroom });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getTeacherForClassroom = async (req, res) => {
    const { classroomId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(classroomId)) {
            return res.json({ success: false, message: "Invalid classroom ID" });
        }

        const classroom = await Classroom.findById(classroomId).populate('teacher');
        if (!classroom) {
            return res.json({ success: false, message: "Classroom not found" });
        }

        const teacher = await User.findById(classroom.teacher);

        if (!teacher) {
            return res.json({ success: false, message: "Teacher not found" });
        }

        res.json({ success: true, message: "Teacher retrieved successfully", teacher });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getStudentForClassroom = async (req, res) => {
    const { classroomId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(classroomId)) {
            return res.json({ success: false, message: "Invalid classroom ID" });
        }

        const classroom = await Classroom.findById(classroomId).populate('student');
        if (!classroom) {
            return res.json({ success: false, message: "Classroom not found" });
        }

        const student = await User.findById(classroom.students);

        if (!student) {
            return res.json({ success: false, message: "Student not found" });
        }

        res.json({ success: true, message: "Student retrieved successfully", student });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



export {createClassroom, assignTeacher, assignStudents, getTeacherForClassroom, getStudentForClassroom}