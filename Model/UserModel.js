const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    id:String,
    name:String,
    username:String,
    email:String
})

const UserModel=mongoose.model("users",userSchema)
module.exports={
    UserModel
}