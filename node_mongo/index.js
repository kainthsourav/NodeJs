const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');

const dboper=require('./operations');


const url='mongodb://localhost:27017/';
const dbname='confusion';

MongoClient.connect(url,(err,client)=>{
    
    assert.equal(err,null);

    console.log('Connected to Server');

    const db=client.db(dbname);
    // const collection=db.collection("dishes");

    // collection.insertOne({"name":"Test","description":"test"},(err,result)=>
    // {
    //     assert.equal(err,null);

    //     console.log('Inserted :\n');
    //     console.log(result.ops);
    //     collection.find({}).toArray((err,docs)=>{
    //        assert.equal(err,null);
    //        console.log("Found : \n");
    //        console.log(docs);
    //        db.dropCollection("dishes",(err,result)=>
    //        {
    //            assert.equal(err,null);

    //            client.close();
    //        });
    //     });
    // });
    dboper.insertDocument(db,{name:"Sourav",description:"Kainth"},"dishes",(result)=>
    {
      console.log('Insert Document: \n',result.ops);
     
      dboper.findDocument(db,"dishes",(docs)=>
      {
         console.log('Found Document: \n',docs);
        
         dboper.updateDocument(db,{name:"Sourav"},{description:"Updated Test"},"dishes",(result)=>
         {
             console.log('Updated Document :\n',result.result);

             dboper.findDocument(db,"dishes",(docs)=>
             {
                console.log('Found the Updated Document :\n',result.result);
                db.dropCollection("dishes",(result)=>
                {
                    console.log("Dropped Collection",result);
                    client.close();
                });
             });

         });
      });
    });
})