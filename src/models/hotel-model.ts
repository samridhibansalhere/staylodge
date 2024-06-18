import mongoose from "mongoose";
const hotelSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    owner:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    address:{
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
if(mongoose.models && mongoose.models["hotels"]){
    delete mongoose.models["hotels"]
}
const HotelModel=mongoose.model("hotels",hotelSchema);
export default HotelModel;