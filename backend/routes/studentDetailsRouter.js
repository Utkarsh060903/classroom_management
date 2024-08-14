import express from 'express'
import { studentDetails } from '../controllers/studentDetails.js'

const studentDetailsRouter = express.Router()

studentDetailsRouter.get('/students/:studentId/students' , studentDetails)

export default studentDetailsRouter


// import express from 'express';
// import { studentDetails } from '../controllers/studentDetails.js';

// const studentDetailsRouter = express.Router();

// // Ensure this path matches what the frontend is using
// studentDetailsRouter.get('/students/:studentId', studentDetails);

// export default studentDetailsRouter;