const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log("Connected to mongo db");
    //Db Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    //new user
    var name = 'user' + Math.floor(Math.random()* 1000);
    var email = name + '@mit.edu';

    //insert into custemer collection
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result){
        console.log("Document inserted");
    });

    //read costumers
    var costumers = collection.find().toArray(function(err, docs){
        console.log('Collection: ', docs);
        //clean up
        client.close();
    });
});