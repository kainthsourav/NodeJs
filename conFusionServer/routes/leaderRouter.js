const express=require('express');
const bodyparser=require('body-parser');

const leaderRouter=express.Router();

leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.all((req,res,next)=>
{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>
{
   res.end("Get Operation of leaders");
})

.post((req,res,next)=>
{
    res.end('Post Operation of leaders : '+req.body.name);
})

.put((req,res,next)=>
{
    res.statusCode=403;
    res.end('Put operation not supported in leaders');
})

.delete((req,res,next)=>
{
    res.end('Deleting all leaders details');
});


leaderRouter.route('/:leaderId')
.get((req,res,next)=>
{
    res.end('Will send the leader detials : '+req.params.leaderId+' to you!');
})

.post((req,res,next)=>
{ 
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})

.put((req,res,next)=>
{
    res.write('Updating the leader detail: '+req.params.leaderId+'\n');
    res.end('Will Update leader '+req.body.name +' with details: '+req.body.description);
})

.delete((req,res,next)=>
{
    res.end('Deleling leader : '+req.params.leaderId);
});


module.exports=leaderRouter;
