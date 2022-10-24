const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
let collection = null;

//connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log("Connected succesfully to db server");
    //connect to myproject db
    collection = client.db('myproject').collection('customers');
});

//create user
function create(name, email, password){
    return new Promise((resolve, reject)=>{
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, res){
            err ? reject(err) : resolve(doc); 
        });
    });
};

//all users

function all(){
    return new Promise((res, rej) =>{
        const consumers = collection.find({}).toArray(function(err, docs){
            err ? rej(err) : res(docs);
        });
    });
};

module.exports = {create, all};