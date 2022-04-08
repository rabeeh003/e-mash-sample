var express = require('express');
var router = express.Router();
var courseHelper=require('../helpers/course-helper')


/* GET home page. */
router.get('/', function (req, res, next) {
  
  courseHelper.getAllCourse().then((courses)=>{
    console.log(courses);
    res.render('user/view-course', {courses})
  })
});

router.get('/login',(req,res)=>{
  res.render('user/login')
})

router.get('/singup',(req,res)=>{
  res.render('user/singup')
})

router.post('/singup',(req,res)=>{
  
})

module.exports = router;
