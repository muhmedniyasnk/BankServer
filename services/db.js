//Server - mongodb integration

//1 import mongoose 

const mongoose = require('mongoose');

//2 state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlparser:true //to avoid unwantted warnings
});

//Define bank db model

const User=mongoose.model('user',
{
    //schema creation
    acno:Number,
    uname:String,
    pswd:String,
    balance:Number,
    transaction:[]
});

//export collection

module.exports={
    User
}