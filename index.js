const express = require("express");
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
app.get("/facebook",passport.authenticate('facebook'),(req,res)=>{
    res.send(req.user?req.user:"No logged in")
  })

  app.listen(3000, () => {
    console.log("server start");
  });