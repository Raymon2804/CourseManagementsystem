const mongoose=require("mongoose");
const courseSchema= new mongoose.Schema({
    course:{
        type:String,
        required:true,
        unique:true
        },
    duration:{
        type:String,
        required:true,
        },
    price:{
        type:Number,
        required:true,
        min:0
    },
    img:String,
    para:String
})
module.exports=mongoose.model("course",courseSchema);