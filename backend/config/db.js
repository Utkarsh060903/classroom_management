import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewurlParser: true,
            useUnifiedTopology: true
        })
        console.log("db successfully connected")
    } catch(error){
        console.log(error)
    }
}

export {connectDB}