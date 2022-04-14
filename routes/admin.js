var express = require('express');
var router = express.Router();
var courseHelper=require('../helpers/course-helper')


/* GET users listing. */
router.get('/', function(req, res, next) {
  courseHelper.getAllCourse().then((courses)=>{
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
router.get('/delete-course/:id',(req,res)=>{
  let cosId=req.params.id
  courseHelper.deleteCourse(cosId).then((response)=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-course/:id',async (req,res)=>{
  let cosId=req.params.id
  let course=await courseHelper.getCourseDetails(cosId)
  console.log(course);
  res.render('admin/edit-course',{course})
})

router.post('/edit-course/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
  courseHelper.updateCourse(req.params.id,req.body).then(()=>{
    res.redirect('/admin/')
    if(req.files.Image){
      let image=req.files.Image
      image.mv('./public/course-images/'+id+'.png')
    }
  })
})

module.exports = router;
