import express from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

// Define the schema for the Teacher
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Teacher'],
    default: 'Teacher'
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom', // Reference to the Classroom model
    required: true
  }
});

// Hash the password before saving the teacher
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare hashed password with input password
teacherSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Create and export the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher
