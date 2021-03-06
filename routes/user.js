const { response } = require('express');
var express = require('express');
var router = express.Router();
var courseHelper=require('../helpers/course-helper')
const userHelpers=require('../helpers/user-helper')
const  verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  let user=req.session.user
  courseHelper.getAllCourse().then((courses)=>{
    res.render('user/view-course', {courses,user})
  })
});

router.get('/login',(req,res)=>{
  console.log("contision cheking");
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
  }
  
})

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
  })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.loginErr="invalid username or password"
      res.redirect('/login')
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})

router.get('/about-course/:id', (req,res)=> {
  let cosId=req.params
  let user=req.session.user
  courseHelper.getCourseDetails(cosId).then((course)=>{
    res.render('user/about-course', {course,user})
  })
});



module.exports = router;
