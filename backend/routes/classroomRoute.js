import express from 'express'
import { assignStudents, assignTeacher, createClassroom, getStudentForClassroom, getTeacherForClassroom } from '../controllers/classroomController.js'

const classroomRouter = express.Router()

classroomRouter.post('/create', createClassroom)
classroomRouter.post('/assign-teacher', assignTeacher)
classroomRouter.post('/assign-students', assignStudents)
classroomRouter.get('/:classroomId/teacher', getTeacherForClassroom)
classroomRouter.get('/:classroomId/students', getStudentForClassroom)

export default classroomRouter