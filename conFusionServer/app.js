var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose=require('mongoose');
const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect=mongoose.connect(url);

connect.then((db)=>
{
  console.log("connected successfully");

},(err)=>{console.log(err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter=require('./routes/dishRouter');
var leaderRouter=require('./routes/leaderRouter');
var promoRouter=require('./routes/promoRouter');
var userRouter=require('./routes/users');
var session=require('express-session');
var FileStore=require('session-file-store')(session);
var passport=require('passport');
var authenticate=require('./authenticate');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
name:'session-id',
secret:'12345-67890-09876-54321',
saveUninitialized:false,
resave:false,
store:new FileStore()
}));


app.use(passport.initialize());
app.use(passport.session());
// function auth(req,res,next)
// {
//   console.log(req.session);
//   if(!req.session.user)
//   {
//     var authHeader=req.headers.authorization;
//     if(!authHeader)
//     {
//       var err=new Error('You are not authenticated');
//       res.setHeader('WWW-Authenticate','Basic');
//       err.status=401;
//       next(err);
//       return;
//     }
//     var auth=new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
//     var user=auth[0];
//     var pass=auth[1];
//     if(user=='admin' && pass =='password')
//     {
//      // res.cookie('user','admin',{expires: new Date(Date.now()+90000),signed : true});
//       req.session.user='admin';
//      next();
//     }
//     else
//     {
//       var err=new Error('You are not authenticated');
//       res.setHeader('WWW-Authenticate','Basic');
//       err.status=401;
//       next(err);
//     }
//   }
//   else 
//   {
//     if(req.session.user==='admin')
//     {
//       next();
//     }
//     else
//     {
//       var err=new Error('You are not authenticated');
//       res.setHeader('WWW-Authenticate','Basic');
//       err.status=401;
//       next(err);
//     }
//   }
// }
app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth(req,res,next)
{
  console.log(req.user);
  if(!req.user){
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
  else{
    next();
  //   if (req.session.user === 'authenticated') {
  //     next();
  //   }
  //   else {
  //     var err = new Error('You are not authenticated!');
  //     err.status = 403;
  //     return next(err);
  //   }
  // }
}
}
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes',dishRouter);
app.use('/leaders',leaderRouter);
app.use('/promo',promoRouter);
app.use('/users',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
