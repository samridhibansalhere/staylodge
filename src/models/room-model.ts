import mongoose from "mongoose";
const roomSchema=new mongoose.Schema({
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"hotels",
        required: true
    },
    name:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rentPerDay:{
        type: Number,
        required: true
    },
    bedrooms:{
        type: Number,
        required: true
    },
    roomNumber:{
        type: Number,
        required: true
    },
    amenities:{
        type: String,
        required: true
    },
    media:{
        type: Array,
        required: true
    },
},{
    timestamps: true
});
require("./hotel-model");
if(mongoose.models && mongoose.models["rooms"]){
    delete mongoose.models["rooms"]
}
const roomModel=mongoose.model("rooms",roomSchema);
export default roomModel;