const express=require("express");
const app=express();
const studentRoute=require("./routes/student");
const teacherRoute=require("./routes/teacher");
const mongoose=require("mongoose");
require("dotenv").config();
const PORT=process.env.port;
const MONGODB_URL=process.env.mongodb_url;


mongoose.connect(MONGODB_URL).then(()=>{
    console.log("mongodb is connected....")
}).catch((err)=>{
    console.log("error is: ",err);
})

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use("/student",studentRoute);
app.use("/teacher",teacherRoute);

app.get("/home",(req,res)=>{
    res.render("home.ejs");
})

app.listen(PORT,()=>{
    console.log("server is listening...");
})