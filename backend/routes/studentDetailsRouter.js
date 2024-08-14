import express from 'express'
import { studentDetails } from '../controllers/studentDetails.js'

const studentDetailsRouter = express.Router()

studentDetailsRouter.get('/students/:studentId/students' , studentDetails)

export default studentDetailsRouter
