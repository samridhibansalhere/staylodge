import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    clerkUserId:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: false,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    },
},{
    timestamps: true
});
if(mongoose.models && mongoose.models["users"]){
    delete mongoose.models["users"]
}
const userModel=mongoose.model("users",userSchema);
export default userModel;