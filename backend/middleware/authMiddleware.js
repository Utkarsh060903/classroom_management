import jwt from 'jsonwebtoken';
import Teacher from '../models/teacherModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(decoded.id);

    if (!teacher) {
      return res.status(401).json({ success: false, message: 'Invalid token, authorization denied' });
    }

    req.user = teacher; // Attach teacher object to req.user
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
