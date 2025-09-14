const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    username:String,
    password:String
})

module.exports=mongoose.model("student",studentSchema);