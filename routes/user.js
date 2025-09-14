const express = require("express");
const router = express.Router();
const course = require("../models/courses");
router.get("/course",async(req,res)=>{
    const courses = await course.find();
    res.render("courses.ejs",{courses,role:"user"})
})
module.exports=router;




