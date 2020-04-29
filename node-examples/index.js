// var rect={
//     parimeter:(x,y)=>(2*(x+y)),
//     area:(x,y)=>(x*y)
// };

var rect=require('./rectangle');

function solbeReact(l,b)
{
    console.log("Solving for rectangle with l= "+l +"and "+ b);
     rect(l,b,(err,rectangle)=>
     {
         if(err)
         {
             console.log("Error: ",err.message);
         }
         else
         {
            console.log("area is "+rectangle.area());
            console.log("parameter are "+rectangle. perimeter);
         }
     });
}

solbeReact(2,4);
solbeReact(3,5);
solbeReact(0,5);
solbeReact(-3,5);