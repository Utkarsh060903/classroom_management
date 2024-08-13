import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const signup = async (req,res) => {
    const {name, email, password, role} = req.body;

    try{
        let user = await User.findOne({email})

        if(user){
            res.json({success: true, message:"User already exists"})
        }

        user = new User({
            name, email, password, role
        })
        await user.save();

        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"}, (error, token) => {
            if(error) throw error
            res.json({token})
        })

    } catch(error){
        console.log(error)
        res.json({success: false, message: "error"})
    }
}
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate('classroom'); // Populate classroom details
        console.log(user)
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            success: true, 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                role: user.role,
                classroom: user.classroom ? user.classroom.name : null // Include classroom name if assigned
            } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export {signup, signin}