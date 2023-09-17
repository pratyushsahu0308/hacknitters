import mongoose from "mongoose"

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://medicaps69:sahuji@cluster0.glavxiu.mongodb.net/');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error){
        console.log(`error ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;