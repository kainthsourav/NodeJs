const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');

const dboper=require('./operations');


const url='mongodb://localhost:27017/';
const dbname='confusion';


MongoClient.connect(url).then((client)=>
{
    console.log("Connected to Server ");
    const db=client.db(dbname);
    
    dboper.insertDocument(db,{name:"Sourav",description:"Test"},"dishes")
    .then((result)=>
    {
        console.log("Insert document \n "+result.ops);
        return dboper.findDocuments(db,"dishes");
    })
    .then((docs)=>
    {
        console.log("Found Docuements: \n",docs);
        CollectionName:string="dishes";
        return dboper.updateDocument(db,{name: "Sourav Kainth",description:"Updated"},CollectionName);
    })
    .then((result)=>
    {
        console.log("Document Updated "+result.result);
        return dboper.findDocuments(db,"dishes");
    })
    .then((docs)=>
    {
        console.log("Found the Updated Document:\n",docs);
        return db.dropCollection("dishes");
    })
    .then((result)=>
    {
        console.log("Dropped Collection ",result);
        return client.close();
    })
    .catch((err)=>console.log(err));
})
.catch((err)=>console.log(err));