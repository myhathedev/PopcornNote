import { MongoClient } from 'mongodb';
let db;

async function connectToDb(cb) {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.xqe2eoj.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();
    db = client.db('notedb');
    cb();
}

export {
    db,
    connectToDb,
}