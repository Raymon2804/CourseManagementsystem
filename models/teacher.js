const mongoose=require("mongoose");
const teacherSchema=new mongoose.Schema({
    email:String,
    password:String
});
module.exports=mongoose.model("teacher",teacherSchema);