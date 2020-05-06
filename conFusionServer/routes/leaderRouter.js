const express=require('express');
const bodyparser=require('body-parser');

const mongoose=require('mongoose');
const Leader=require('../models/leadership');

const leaderRouter=express.Router();

leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.get((req,res,next)=>
{
    Leader.find({}).then((leaders)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>
{
    Leader.create(req.body)
    .then((leader)=>
    {
        console.log('Leader Added',leader);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
 })

.put((req,res,next)=>
{
    res.statusCode=403;
    res.end('Put operation not supported in leaders');
})

.delete((req,res,next)=>
{
    Leader.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


leaderRouter.route('/:leaderId')
.get((req,res,next)=>
{
    Leader.findById(req.params.leaderId).then((leader)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>
{ 
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})

.put((req,res,next)=>
{
    Leader.findByIdAndUpdate(req.params.leaderId,{$set:req.body}
        ,{
           new:true
       }).then((leader)=>
       {
        res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })

.delete((req,res,next)=>
{
    Leader.findByIdAndRemove(req.params.leaderId).then((resp)=>
   {res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp);
},(err)=>next(err))
.catch((err)=>next(err));
});


module.exports=leaderRouter;
