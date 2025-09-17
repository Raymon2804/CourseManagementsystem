const express = require("express");
const router = express.Router();
const student = require("../models/student");
const course = require("../models/courses");
const enrollment = require("../models/enrollment");

//enrolled msg...
router.post("/enrolled", async (req, res) => {
  const { username,course } = req.body;
  const students = await student.findOne({ username });
  await enrollment.create({username,course,status:"pending"});
  res.render("enroll.ejs", { students });
})

//view all the courses
router.get("/course/:username", async (req, res) => {
  const { username } = req.params;
  const courses = await course.find();
  const studentsData = await student.findOne({ username });
  res.render("courses.ejs", { students:studentsData, courses, role: "student" });
})

router.get("/course/:username/:courseid",async(req,res)=>{
  const {username,courseid}=req.params;
  const studentData=await student.findOne({username});
  const courseData=await course.findById(courseid);
  console.log(courseData.img);
  res.render("courseDetail.ejs",{studentData,course:courseData});
})
//login page
router.get("/login", (req, res) => {
  res.render("login.ejs", { role: "student" });
});
//authenticating the user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await student.findOne({ username });
  if (user && user.password === password) {
    res.redirect(`/student/course/${username}`);
  } else {
    res.send(`<script>
            alert("check your creds");
            window.location.href="/student/login"
            </script>`);
  }
});
//sign up page 
router.get("/signup",(req,res)=>{
  res.render("signup.ejs");
})

router.post("/signup",async(req,res)=>{
  const{username,password,confirmPassword}=req.body;
  if(password !== confirmPassword){
    return res.status(400).send("check your password");
  }
  const existingStud=await student.findOne({username});
  if(existingStud){
    return res.status(400).send("Username already exists");
  }
  const newstudent= new student({username,password});
  await newstudent.save();
  res.redirect("/student/login");
})

module.exports = router;