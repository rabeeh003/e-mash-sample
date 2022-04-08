var express = require('express');
var router = express.Router();
var courseHelper=require('../helpers/course-helper')


/* GET users listing. */
router.get('/', function(req, res, next) {
  courseHelper.getAllCourse().then((courses)=>{
    console.log(courses);
    res.render('admin/view-course', {admin:true,courses})
  })
});

router.get('/add-course',function(req,res) {
  res.render('admin/add-course')
})
router.post('/add-course',(req,res)=>{

  courseHelper.addCourse(req.body,(id)=>{
    let image=req.files.Image
    console.log(id)
    image.mv('./public/course-images/'+id+'.png',(err)=>{
      if(!err){
        res.render('admin/add-course')
      }else{
        console.log(err);
      }
    })
    
  })
})

module.exports = router;
