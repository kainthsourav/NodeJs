const mongoose=require('mongoose');
const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/confusion';
const connect=mongoose.connect(url);

connect.then((db)=>
{
    console.log("Connected to Server");

    Dishes.create({
        name:'Uthapizza',
        description:'Test - 2'
    })
    .then((dish)=>
    {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,
            {$set : {description:'Test -2 Updated'}
        },{
            new:true
    }).exec();
    })
    .then((dish)=>
    {
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment:'This is comment',
            author:'Kainth sourav'
        });
        return dish.save();
    })
    .then((dish)=>
    {
        console.log(dish);
        return Dishes.remove({});
    })
    .then(()=>
    {
        mongoose.connection.close();
    })
    .catch((err)=>console.log(err));
});

    // Dishes.create({
    //     name:'Uthappizza',
    //     description:'Test-2'
    // })
    // .then((dish)=>{
    //     console.log(dish);
    //     return Dishes.find({}).exec();
    // })
    // .then((dishes)=>{
    //     console.log(dishes);
    //     return Dishes.remove({});
    // })
    // .then(()=>{
    //     return mongoose.connection.close();
    // })
    // .catch((err)=>console.log(err));

    // var newDish=Dishes({
    //     name:'Uthappizza',
    //     description:'test'
    // });
    
    // newDish.save().then((dish)=>
    // {
    //     console.log(dish);
    //     return Dishes.find({});
    // })
    // .then((dishes)=>
    // {
    //     console.log(dishes);
    //     return Dishes.remove({});
    // })
    // .then(()=>
    // {
    //     return mongoose.connection.close();
    // })
    // .catch((err)=>console.log(err));