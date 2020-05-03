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



//for /dish/anything
dishRouter.route('/:dishId')
.get((req,res,next)=>
{
    res.end('Will send the dishe detials : '+req.params.dishId+'to you!');
})

.post((req,res,next)=>
{
    res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})

.put((req,res,next)=>
{ 
    res.write('Updating the dish: '+req.params.dishId+'\n');
    res.end('Will Update the dish '+req.body.name +' with details: '+req.body.description);

})

.delete((req,res,next)=>
{
    res.end('Deleling dish : '+req.params.dishId);

});


module.exports=dishRouter;
module.exports=dishRouter_extra;