const express=require('express');
const bodyparser=require('body-parser');

const dishRouter=express.Router();

dishRouter.use(bodyparser.json());

dishRouter.route('/')
.all((req,res,next)=>
{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>
{
    res.end('Will send all the dishes to you');
})

.post((req,res,next)=>
{
    res.end('Adding the dish : '+req.body.name+' Details : '+req.body.description);
})

.put((req,res,next)=>{
res.statusCode=403;
res.end('Put operation not supported');
})

.delete((req,res,next)=>{
res.end('Deleting all dishes');
});

module.exports=dishRouter;