const { response } = require('express');
var express = require('express');
var router = express.Router();
var courseHelper=require('../helpers/course-helper')
const userHelpers=require('../helpers/user-helper')

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

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    res.redirect('/')
  })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
})

module.exports = router;
