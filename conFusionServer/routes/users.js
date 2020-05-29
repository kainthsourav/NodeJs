var express = require('express');
var passport=require('passport');
const bodyParser=require('body-Parser');
const User=require('../models/users');
const UserRouter = express.Router();

UserRouter.use(bodyParser.json());



UserRouter.post('/signup',(req,res,next)=>{
  User.register(new User({username:req.body.username}),
  req.body.password,(err,user)=>{
    if(err){
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err})
    }
    else
    {
      passport.authenticate('local')(req,res,()=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true,status:'Registered Successfully'});
      });
    }
  });
});


UserRouter.post('/login', passport.authenticate('local'),(req, res) => {
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success:true,status:'Logged In Successfully'});
});

UserRouter.get('/logout',(req,res)=>{
  if(req.session)
  {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = UserRouter;
