const express = require('express');
var app = express();
const cors = require('cors');
const {create, all} = require('./dal.js');

//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function(req, res){
    create(req.params.name, req.params.email, req.params.password).then((user) => {
        console.log(user);
        res.send(user);
    });
});

//all accounts
app.get('/account/all', function(req, res){
    all().then((docs)=>{
        console.log(docs);
        res.send(docs);
    });
});

const port = 3000;
app.listen(port);
console.log('Running on port: '+port);