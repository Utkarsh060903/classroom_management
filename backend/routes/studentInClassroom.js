import express from 'express'
import { getStudentsInClassroom } from '../controllers/studentInClassroom.js'

const studentsInClassroomRouter = express.Router()

studentsInClassroomRouter.get('/classroom-students' , getStudentsInClassroom)

export default studentsInClassroomRouter