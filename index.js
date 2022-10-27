const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
var app = express();
const {create, insertTransaction, accountInfo, updateBalance, getTransactions, getUser, allUsers} = require('./dal.js');

//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//swagger documantation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//create user account
app.get('/account/create/:name/:email/', function(req, res){
    create(req.params.name, req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    }).catch(e=>console.log(e));
});

//get all the info from one account
app.get('/account/info/:email', function(req, res){
    accountInfo(req.params.email).then(docs => {
        console.log(docs);
        res.send(docs);
    });
});

//make a transaction
app.get('/account/transaction/:email/:type/:amount', function(req, res){
    insertTransaction(req.params.email, req.params.type, req.params.amount).then(docs=>{
        updateBalance(req.params.email, req.params.type, req.params.amount).then(r=>{
            console.log(r);
            res.send(r);
        })
    });
});

//getAllTransactions
app.get('/transactions/:email', function(req, res){
    getTransactions(req.params.email).then(r=>{
        res.send(r);
        console.log(r);
    });
});

//getUser to transfer
app.get('/transfer/search/:email', function(req, res){
    getUser(req.params.email).then(r=>{
        res.send(r);
        console.log(r);
    })
});

//make a transfer
app.get('/transfer/:sender/:receptor/:amount', function(req, res){
    insertTransaction(req.params.sender, `Transfer to ${req.params.receptor}`, req.params.amount).then(docs=>{
        updateBalance(req.params.sender, "withdraw", req.params.amount).then(r=>{
            console.log("Sender Updated");
        })
    })

    insertTransaction(req.params.receptor, `Transfer from ${req.params.sender}`, req.params.amount).then(docs=>{
        updateBalance(req.params.receptor, "deposit", req.params.amount).then(r=>{
            console.log("Receptor Updated");
        })
    })
    res.send("Successfully Transfer");
});

//get all users 
app.get('/users/all', function(req, res){
    allUsers().then(r=>{
        res.send(r);
        console.log(r);
    });
});

//check user in db
app.get('/check/:email/:name', function(req, res){
    accountInfo(req.params.email).then(r=>{
        if (!r){
            create(req.params.name, req.params.email).then(r=>{
                res.send("The user logged with Google has been added");
            });
        }
        else{
            res.send("The user is already registered");
        }
    });
});

var port_number = process.env.PORT || 3000;
app.listen(port_number);
console.log('Running on port: '+port_number);