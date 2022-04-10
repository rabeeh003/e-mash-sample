var db=require('../config/connection')
var collection=require('../config/collections')
const { response } = require('../app')
var objectId=require('mongodb').ObjectId

module.exports={

    addCourse:(course,callback)=>{
        db.get().collection('course').insertOne(course).then((data)=>{
            callback(data.insertedId)
        })
    },
    getAllCourse:()=>{
        return new Promise(async(resolve,reject)=>{
            let courses=await db.get().collection(collection.COURSE_COLLECTION).find().toArray()
            resolve(courses)
        })
    },
    deleteCourse:(cosId)=>{
        return new Promise((resolve,reject)=>{
            console.log("delete cheyyan povaane");
            console.log(objectId(cosId));
            db.get().collection(collection.COURSE_COLLECTION).deleteOne({_id:objectId(cosId)}).then((response)=>{
                console.log('cheythu ini response kandoolitto');
                console.log(response);
                resolve(response)
            })
        }) 
    },
    getCourseDetails:(cosId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COURSE_COLLECTION).findOne({_id:objectId(cosId)}).then((course)=>{
                resolve(course)
            })
        })
    },
    updateCourse:(cosId,cosBody)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COURSE_COLLECTION)
            .updateOne({_id:objectId(cosId)},{
                $set:{
                    course:cosBody.course,
                    about:cosBody.about,
                    price:cosBody.price,
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}