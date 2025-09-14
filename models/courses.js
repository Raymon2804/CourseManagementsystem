const mongoose=require("mongoose");
const courseSchema= new mongoose.Schema({
    course:String,
    duration:String,
    price:String
})
module.exports=mongoose.model("course",courseSchema);