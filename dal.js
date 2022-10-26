const {MongoClient} = require("mongodb");
const url = "mongodb+srv://angel_012912:NiupiAP@cluster0.rrlww2k.mongodb.net/?retryWrites=true&w=majority";
let users;
let transactions;


//connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    if (err) throw(err);
    console.log("Connected succesfully to db server");
    //connect to myproject db
    let db = client.db('myproject');
    users = db.collection('users');
    transactions = db.collection('transactions');
});

//create user
function create(name, email){
    return new Promise((resolve, reject)=>{
        const doc = {name, email, balance: 0};
        users.insertOne(doc, {w:1}, function(err, res){
            err ? reject(err) : resolve(doc); 
        });
    });
};

//Get the information from one account
function accountInfo(email){
    return new Promise((res, rej) =>{
        const user = users.findOne({email: email}, {projection: {_id:0, password: 0}}).then(function(docs, err){
            err ? rej(err) : res(docs); 
        });
    });
};

//Make one transaction
function insertTransaction(email, type, amount){
    //Insert the transaction
    return new Promise((resolve, reject)=>{
        const doc = {email, type, amount};
        transactions.insertOne(doc, {w:1}, function(err, res){
            err ? reject(err) : resolve(doc);
        })
    });
}

//update balance 
function updateBalance(email, type, amount){
    //get balance 
    return accountInfo(email).then((u)=>{
        let userBalance = parseFloat(u.balance);
        amount = parseFloat(amount);
        let balance = type == 'deposit' ? userBalance + amount : userBalance - amount;
        //update the new balance
        return new Promise ((resolve, reject)=>{
            const query = {email: email};
            const newValues = {$set: {balance: balance}};
            users.updateOne(query, newValues, function(err, res){
                err ? reject(err) : resolve(res);
            });
        });
    });
};

//get All Transactions
function getTransactions(email){
    return new Promise((resolve, reject)=>{
        const user = transactions.find({email: email}, {projection: {_id:0, email: 0}}).toArray(function(err, docs){
            err ? reject(err) : resolve(docs);
        });
    });
}

//fin user to transfer
function getUser(email){
    return new Promise((res, rej) =>{
        const user = users.findOne({email: email, role: {$ne: "admin"}}, {projection: {_id:0}}).then(function(docs, err){
            err ? rej(err) : res(docs); 
        });
    });
}

//get all users
function allUsers(){
    return new Promise((res, rej)=>{
        const user = users.find({role: {$ne: "admin"}}, {projection: {_id: 0}}).toArray(function(err, docs){
            err ? rej(err) : res(docs);
        });
    });
}

//check if the email is registered, if not, inserted


module.exports = {create, accountInfo, insertTransaction, updateBalance, getTransactions, getUser, allUsers};