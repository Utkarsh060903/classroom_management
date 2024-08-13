import express from 'express'
import { getClassrooms } from '../controllers/classroomListController.js'

const classroomListRouter = express.Router()

classroomListRouter.get('/classroom-list' , getClassrooms)

export default classroomListRouter