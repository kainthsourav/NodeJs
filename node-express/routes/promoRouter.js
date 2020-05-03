const express=require('express');
const bodyparser=require('body-parser');

const promoRouter=express.Router();

promoRouter.use(bodyparser.json());

promoRouter.route('/')
.all((req,res,next)=>
{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>
{
   res.end("GET operation of promo")
})

.post((req,res,next)=>
{
    res.end('POST operation of promo :'+req.body.name);
})

.put((req,res,next)=>
{
    res.statusCode=403;
    res.end('PUT operation not supported in Promo');
})

.delete((req,res,next)=>
{
    res.end('Deleting all Promo details');
});


//////


promoRouter.route('/:promoId')
.get((req,res,next)=>
{
    res.end('Will send the promo detials : '+req.params.promoId+' to you!');
})

.post((req,res,next)=>
{
    res.statusCode = 403;
    res.end('POST operation not supported on /promo/'+ req.params.promoId);
})

.put((req,res,next)=>
{
    res.write('Updating the promo detail: '+req.params.promoId+'\n');
    res.end('Will Update promo '+req.body.name +' with details: '+req.body.description);
})

.delete((req,res,next)=>
{
    res.end('Deleling promo : '+req.params.promoId);
});


module.exports=promoRouter;