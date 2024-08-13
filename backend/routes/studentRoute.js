import express from 'express'
import { getStudentsWithClassrooms } from '../controllers/studentController.js'

const studentRouter = express.Router()

studentRouter.get('/student', getStudentsWithClassrooms)

export default studentRouter