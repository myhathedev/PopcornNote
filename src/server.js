import express from "express";
import { db,connectToDb } from "./db.js";
import cors from "cors";
import fs from 'fs';
import admin from 'firebase-admin';

const credentials = JSON.parse(
    fs.readFileSync('./credential.json')
)

admin.initializeApp({
    credential : admin.credential.cert(credentials),
})


const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.use(async (req,res,next) =>{
    const {authtoken } = req.headers;
    if (authtoken) {
        try {
        req.user = await admin.auth().veryfyIdToken(authtoken); }
            catch (e) {
                return res.sendStatus(400);
            }
        }
        req.user = req.user || {};
        next();
})

app.use((req,res,next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
})

app.post('/api/notelist/signup/:username', async (req,res) => {
    const {username} = req.params;
    const {uid} = req.user;

    if (! (await db.collection('users').findOne({username}))) {
        await db.collection('users').insertOne({
            username: username, 
            uid: uid,
            originalCount:0, 
            updatedCount:0}); 
    } else {
        res.json({'status':false})
    }
});


app.post('/api/notelist/post', async (req,res) => {
    const {title, content}= req.body;
    const {uid} = req.user;
   
    await db.collection('users').updateOne({uid}, {$inc: {originalCount:1,updatedCount:1}});
    const user = await db.collection('users').findOne({uid});
    const id = (user.originalCount)+uid;
    await db.collection('notelist').insertOne({
        _id: id,
        user: uid, 
        title,
        content,
        date: Date()
    }); 
    const list = await db.collection('notelist').find().toArray();
   res.send(list);
});

app.get('/api/notelist/list',async (req,res) => {
    const {uid} = req.user;
    res.send(await db.collection('notelist').find({uid}).toArray());
});

app.post('/api/notelist/:id/update',async (req,res) => {
    const {id} = req.params;
    await db.collection('notelist').updateOne({_id:id},{$set : {title: req.body.title,content: req.body.content }}) 
    res.send('ok');
});



app.get('/api/notelist/:id/get', async(req,res) => {
    const {id} = req.params;
    const note = await db.collection('notelist').findOne({_id : id});
    res.send(note);
});

app.delete('/api/notelist/:id/delete', async(req,res) => {
    const {id} =  req.params;
    const note = await db.collection('notelist').findOne({_id:id});

    if (note){
        await db.collection('notelist').deleteOne({_id:id});
        await db.collection('users').updateOne({username:note.username}, {$inc : {updatedCount:-1}});
        res.send('Deleted');
    } else {
        res.send('This note does not exist.');
    }
}
);

connectToDb(() => {
    console.log('Connect successfully');
    app.listen(8000, () => {
        console.log('server is listening on port 8000');
    });
})