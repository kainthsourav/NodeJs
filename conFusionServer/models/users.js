const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var passportLocal=require('passport-local-mongoose');


var User=new Schema({
    admin:
    {
        type:Boolean,
        default:false
    }
});

User.plugin(passportLocal);

module.exports=mongoose.model('User',User);
