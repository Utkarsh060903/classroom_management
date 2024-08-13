import express from 'express'
import { createUser, getUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/create', createUser)
userRouter.get('/:id', getUser)

export default userRouter