const express = require("express");
const router = express.Router();
const student = require("../models/student");
const course = require("../models/courses");
const enrollment = require("../models/enrollment");

//enrolled msg...
router.post("/enrolled", async (req, res) => {
  const { username } = req.body;
  const students = await student.findOne({ username });
  await enrollment.create(req.body);
  res.render("enroll.ejs", { students });
});

//view all the courses
router.get("/course/:username", async (req, res) => {
  const { username } = req.params;
  const courses = await course.find();
  const students = await student.findOne({ username });
  res.render("courses.ejs", { students, courses, role: "student" });
});
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

module.exports = router;