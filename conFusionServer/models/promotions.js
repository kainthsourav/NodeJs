const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

const PromotionSchema=new Schema({
   name:{
       type:String,
       required:true
   },
   image:{
       type:String
   },
   label:{
       type:String
   },
   price:{
       type:Currency
   },
   description:{
       type:String
   },
   featured:{
       type:Boolean
   }},
{
    timestamps:true
});

var Promotion=mongoose.model('Promo',PromotionSchema);

module.exports=Promotion;
