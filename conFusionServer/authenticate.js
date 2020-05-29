var passport=require('passport');
var localStrategy=require('passport-local').Strategy;
var users=require('./models/users');

passport.use(new localStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

