const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
//const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://dbAdmin:dbAdmin@cluster0.e1tui.mongodb.net/dbChat?retryWrites=true&w=majority';

// Database Name
const dbName = 'dbChat';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    //assert.strictEqual(null, err);
    if (err) {
        console.error('Connection failed.');
        throw err;
    }

    console.log('Connected successfully to server. ');

    const db = client.db(dbName);

    // insertDocuments(db, function () {
    //     client.close();
    // });
    
    removeDocuments(db, ()=>{
        client.close();
    });
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function (err, result) {
        assert.strictEqual(err, null);
        assert.strictEqual(3, result.result.n);
        assert.strictEqual(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        callback(result);
    });
};

const removeDocuments = function(db, callback){
    const collection = db.collection('documents');

    collection.deleteMany({}, (err, result)=>{
        if (err){
            console.log('Remove failed');
        };
        console.log("Removed " + result.n + " documents.");

    })
}
