import Classroom from "../models/classroomModel.js";

const getClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find({}, 'name _id');

        if (classrooms.length === 0) {
            res.json({ success: false, message: 'No classrooms found' });
        }

        res.json({ success: true, classrooms });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while fetching the classrooms' });
    }
};

export {getClassrooms}