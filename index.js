const express = require("express");
require("dotenv").config();
const PORT=process.env.PORT
const {Connect} =require("./Config/Config")
const {UserModel} =require("./Model/UserModel")
const passport = require("passport");
const expressSession=require("express-session")
const FacebookStrategy =require("passport-facebook").Strategy;
const app = express();
const cors=require("cors")

app.use(
  cors({
    origin: "*",
  })
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  app.use(expressSession({
    secret:"Ashiq",
    resave:true, 
    saveUninitialized:true
}))
  app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID:"185527964317672",
    clientSecret:"d5459b79a701423e44550a270953db39",
    callbackURL:"/facebook",
    profileFields:["email","displayName","name","picture","friends"]
},function(accessToken,refreshToken,profile,done){
     done(null,profile)
     console.log(profile.picture)
}))

app.get("/auth/facebook",passport.authenticate('facebook',{scope:["email"]}))
app.get("/",(req,res)=>{
  res.send("Home")
})
app.get("/facebook",passport.authenticate('facebook'),async (req,res)=>{
    try{
     
      if(req.user){
        const {id,name,email,first_name}=req.user._json
        const payload={id,name,email,username:first_name}
        const user=new UserModel(payload)
        await user.save()
        res.send("LogIn Successful")
      }else{
        res.send("No Logging")
      }
    }
    catch{
      res.send("err")
    }
  })

  app.listen(PORT, async() => {
    try{
     await Connect
     console.log("Server Running")
    }
    catch(err){
       console.log(err)
    }
  });