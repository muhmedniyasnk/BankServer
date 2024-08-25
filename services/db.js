//Server - mongodb integration

//1 import mongoose 

const mongoose = require('mongoose');

//2 state connection string via mongoose





// MongoDb Atlass
// Connection URI for MongoDB Atlas
const uri ='mongodb+srv://niyaasmuhmed:PbNDE94KEfflY593@cluster0.ddkkzxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas using Mongoose');

        // Define a Mongoose schema
        const Schema = mongoose.Schema;
        const exampleSchema = new Schema({
            name: String,
            age: Number
        });

        // Define a Mongoose model
        const ExampleModel = mongoose.model('Example', exampleSchema);

        // Example: Inserting a document
        const exampleDocument = new ExampleModel({ name: 'Bob', age: 35 });
        exampleDocument.save()
            .then(() => {
                console.log('Document inserted successfully');

                // Example: Querying documents
                ExampleModel.find({})
                    .then(documents => {
                        console.log('Documents:', documents);
                    })
                    .catch(err => {
                        console.error('Error querying documents:', err);
                    });
            })
            .catch(err => {
                console.error('Error inserting document:', err);
            });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });
// outer mongodb








// Mongodb compass

// mongoose.connect('mongodb://localhost:27017/BankServer',
// {
//     useNewUrlparser:true //to avoid unwantted warnings
// });

// Mongodb compass







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