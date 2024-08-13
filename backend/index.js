import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import cors from 'cors'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import classroomRouter from './routes/classroomRoute.js'
import studentRouter from './routes/studentRoute.js'
import teacherRouter from './routes/teacherRoute.js'
import classroomListRouter from './routes/classroomListRoute.js'
import studentsInClassroomRouter from './routes/studentInClassroom.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth'  , authRouter)
app.use('/api/users', userRouter)
app.use('/api/classrooms', classroomRouter)
app.use('/api' , studentRouter)
app.use('/api' , teacherRouter)
app.use('/api' , classroomListRouter)
app.use('/api/teacher' , studentsInClassroomRouter)

const PORT = 5000

app.listen(PORT, () => {
    console.log(`server running on ${PORT} `)
})


