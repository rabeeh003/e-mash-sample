var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
console.log('data collection start');
module.exports={

    doSignup:(userData)=>{
        return new Promise (async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data)
            })
            
        })
        
    },
    doLogin:(userData)=>{
        return new Promise (async(resolve,rejecr)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        response.user=user
                        response.status=true
                        resolve(response)
                        console.log('login success full');

                    }else{
                        console.log("password not mach");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("user not font");
                resolve({status:false})
            }
        })
    }
}