import express from 'express'
import { getTeacherWithClassroom } from '../controllers/teacherController.js'

const teacherRouter = express.Router()

teacherRouter.get('/teacher' , getTeacherWithClassroom)

export default teacherRouter