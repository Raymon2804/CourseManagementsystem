const mongoose=require("mongoose");
const enrollmentSchema=new mongoose.Schema({
    username:String,
    course:String,
    status:{
        type:String,
        enum:["pending","approved"]
    }
})
module.exports=mongoose.model("enrollment",enrollmentSchema);