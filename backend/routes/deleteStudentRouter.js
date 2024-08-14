import express from 'express'
import { deleteStudent } from '../controllers/deleteStudent.js'

const deleteStudentRouter = express.Router()

deleteStudentRouter.delete('/teacher/:teacherId/students/:studentId' , deleteStudent)

export default deleteStudentRouter
