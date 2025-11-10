const {MongoClient} = require('mongodb');
const { get } = require('../routes');
require('dotenv').config();
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

let _db;

async function connect() {
    try {
        await client.connect();
        _db = client.db();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

getDB = () => {
    if (!_db) {
        connect();
    }                  
    return _db;
}

module.exports = { getDB };