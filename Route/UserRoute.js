const express=require("express")
const userRoute=express.Router()
const {UserModel} =require("../Model/UserModel")

userRoute.get("/users",async(req,res)=>{
    const userId=req.query.userId
    const name=req.query.name
    const username=req.query.username
    const email=req.query.email
    if(userId || name || username || email){
        try{
            const data=await UserModel.find({$or:[{"userId":userId},{"name":name},{"username":username},{"email":email}]})
            res.send(data)
          }
          catch(err){
            res.send(err)
          }
    }
    else{
        try{
       const data=await UserModel.find()
       res.send(data)
        }
        catch(err){
          res.send(err)
        }
    }
})

module.exports={
    userRoute
}