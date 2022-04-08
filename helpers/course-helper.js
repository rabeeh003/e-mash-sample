var db=require('../config/connection')
var COLLECTIONS=require('../config/collections')
module.exports={

    addCourse:(course,callback)=>{
        db.get().collection('course').insertOne(course).then((data)=>{
            callback(data.insertedId)
        })
    },
    getAllCourse:()=>{
        return new Promise(async(resolve,reject)=>{
            let courses=await db.get().collection(COLLECTIONS.COURSE_COLLECTION).find().toArray()
            resolve(courses)
        })
    }
}