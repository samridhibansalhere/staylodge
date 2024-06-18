import mongoose from "mongoose";

export const connectMongoDB= async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL!);
        console.log('Mongo DB Connection Successful');
    } catch(error){
        console.log('Mongo DB Connection Failed',error);
    }
};