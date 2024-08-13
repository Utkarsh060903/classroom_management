import Classroom from "../models/classroomModel.js"
import User from "../models/userModel.js"

const createUser = async(req,res) => {
    const {name, email, password, role, classroomId} = req.body

    try{
        let user = await User.findOne({email})

        if(user){
            res.json({success: false, message: "User already exists"})
        }

        if(role === 'Teacher' || role === 'Student'){
            const classroom = await Classroom.findById(classroomId)
            if(!classroom){
                res.json({success: false, message: "Invalid classroom ID"})
            }
        }

        user = new User({
            name, email, password, role,
            classroom: role === 'Teacher' || role === 'Student' ? classroomId : null
        })

        await user.save()
        res.json({success: true , message: `${role} successfully crreated`, user})

    } catch(error){
        console.log(error)
        res.json({success: false, message: "error"})
    }
}

const getUser = async (req,res) => {
    try{
        const teachers = await User.find({role: 'Teacher'}).select('-password')
        const students = await User.find({role: 'Student'}).select('password')
        res.json({teachers, students})
    } catch(error){
        console.log(error)
        res.json({success: false, message: "error"})
    }
}

export {createUser, getUser}