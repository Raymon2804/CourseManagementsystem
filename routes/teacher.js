const express=require("express");
const router=express.Router();
const teacher=require("../models/teacher");
const course=require("../models/courses");
const enrollment = require("../models/enrollment");

//login-page
router.get("/login",(req,res)=>{
    res.render("login.ejs",{role:"teacher"});
});
//authentication 
router.post("/login",async(req,res)=>{
    const {email, password}=req.body;
    const teachers= await teacher.findOne({email});
    if(teachers && teachers.password === password){
        res.redirect("/teacher/course");
    }else{
        res.send(`<script>
            alert("check your creds");
            window.location.href="/teacher/login"
            </script>`)
    }
})

//view all courses
router.get("/course",async(req,res)=>{
    const courses=await course.find();
    res.render("courses.ejs",{courses,role:"teacher"})
})

//shows addcourseform
router.get("/courses/add",(req,res)=>{
    res.render("addCourses.ejs");
})
//add 
router.post("/courses/add",async(req,res)=>{
    await course.create(req.body);
    res.redirect("/teacher/course");
})
//edit
router.get("/courses/edit/:id",async(req,res)=>{
    const courses=await course.findById(req.params.id);
    res.render("editCourses.ejs",{courses});
})
router.post("/courses/edit/:id",async(req,res)=>{
    const{courses,duration,price}=req.body;
    const abc=await course.findByIdAndUpdate(req.params.id,{courses,duration,price});
    console.log(abc);
    res.redirect("/teacher/course");
})

//enrollment_data
router.get("/enrollment",async(req,res)=>{
    const enrollments=await enrollment.find();
    res.render("enrollmentPage.ejs",{enrollments})
})

//enrollment_data_delete
router.post("/enrollment/delete/:id",async(req,res)=>{
    await enrollment.findByIdAndDelete(req.params.id);
    res.redirect("/teacher/enrollment")
})

router.post("/enrollment/approve/:id",async(req,res)=>{
    await enrollment.findByIdAndUpdate(req.params.id,{status:"approved"});
    
})
router.get("/enrollment/approve/:id",async(req,res)=>{
   res.redirect("teacher/course");   
})



module.exports=router;