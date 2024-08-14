import express from 'express'
import { getStudentsInTeachersClassroom } from '../controllers/studentInClassroom.js'

const studentsInClassroomRouter = express.Router()

studentsInClassroomRouter.get('/teacher/:teacherId/students' , getStudentsInTeachersClassroom)

export default studentsInClassroomRouter