const express=require('express');
const bodyparser=require('body-parser');

const Promotion=require('../models/promotions');

const promoRouter=express.Router();

promoRouter.use(bodyparser.json());

promoRouter.route('/')
.get((req,res,next)=>
{
  Promotion.find({}).then((promotions)=>
  {
      
      res.statusCode=200;
      res.setHeader('Content-Type','applicaton/json');
      res.json(promotions);
  },(err)=>next(err))
  .catch((err)=>next(err));
})

.post((req,res,next)=>
{
    Promotion.create(req.body).then((promotion)=>
    {
        console.log("Added",promotion)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>
{
    res.statusCode=403;
    res.end('PUT operation not supported in Promo');
})

.delete((req,res,next)=>
{
   Promotion.remove({}).then((resp)=>
   {
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(resp);
   },(err)=>next(err))
   .catch((err)=>next(err))
});


//////


promoRouter.route('/:promoId')
.get((req,res,next)=>
{
  Promotion.findById(req.params.promoId).then((promotion)=>
  {
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(promotion)
  })
})

.post((req,res,next)=>
{
    res.statusCode = 403;
    res.end('POST operation not supported on /promo/'+ req.params.promoId);
})

.put((req,res,next)=>
{
    Promotion.findByIdAndUpdate(req.params.promoId,{$set:req.body}
        ,{
           new:true
       }).then((promotion)=>
       {
           res.statusCode=200;
           res.setHeader('Content-Type','application/json');
           res.json(promotion);
       },(err)=>next(err))
       .catch((err)=>next(err));
})

.delete((req,res,next)=>
{
   Promotion.findByIdAndRemove(req.params.promoId).then((resp)=>
   {
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(resp);
   },(err)=>next(err))
   .catch((err)=next(err));
});


module.exports=promoRouter;