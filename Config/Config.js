require("dotenv").config();
const URL = process.env.mongo_URL;
const mongoose=require("mongoose")

const Connect=mongoose.connect(URL)
module.exports={
    Connect
}