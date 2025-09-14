const mongoose=require("mongoose");
const enrollmentSchema=new mongoose.Schema({
    username:String,
    course:String
})
module.exports=mongoose.model("enrollment",enrollmentSchema);