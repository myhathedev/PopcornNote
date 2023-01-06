import express from "express";
import { db,connectToDb } from "./db.js";
import cors from "cors";
import fs from 'fs';
import admin from 'firebase-admin';
import moment from 'moment';


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
        req.user = await admin.auth().verifyIdToken(authtoken); }
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

//create user
app.post('/api/signup/:username', async (req,res) => {
    const {username} = req.params;
    const {uid} = req.user;

    if ((await db.collection('users').findOne({username}))) {
        res.send({'status':false});
        return;
    } else {
        await db.collection('users').insertOne({
            uid: uid,
            username: username, 
            originalCount:0, 
            updatedCount:0}); 
        res.send({'status':'ok'});     
    }
});

//get username
app.get('/api/getusername/:uid',async (req,res) => {
    const {uid} = req.params;
    const response = await db.collection('users').findOne({uid : uid});
    console.log(uid);
    if (response) {
        res.send(response.username);
        return;
    } else {
         res.send('Meow!');
    }
    
});

//new note
app.post('/api/notelist/post/:username', async (req,res) => {
    const {title, content}= req.body;
    const {username} = req.params ;
    const {uid} = req.user;
    const user =  await db.collection('users').findOne({uid});
    const id = username+user.originalCount
    await db.collection('users').updateOne({username}, {$inc: {originalCount:1,updatedCount:1}});
    await db.collection('notelist').insertOne({
        _id: id ,
        username: username, 
        uid: uid,
        title,
        content,
        datecreated: moment().format('llll'),
        dateupdated: moment().format('llll'),
    }); 
    const list = await db.collection('notelist').find().toArray();
   res.send(list);
});

//show list
app.get('/api/notelist/list',async (req,res) => {
    const {uid} = req.user;
    res.send(await db.collection('notelist').find({uid}).toArray());
});



//update note
app.put('/api/notelist/update/:id',async (req,res) => {
    const {id} = req.params;
    const {uid} = req.user;
    await db.collection('notelist').updateOne({_id:id,uid:uid},{
        $set : {
            title: req.body.title,
            content: req.body.content, 
            dateupdated: moment().format('llll') }}) 
    res.send('ok');
});


//read a note
app.get('/api/notelist/get/:id', async(req,res) => {
    const {id} = req.params;
    const note = await db.collection('notelist').findOne({_id : id});
    res.send(note);
});


//delete a note
app.delete('/api/notelist/delete/:id', async(req,res) => {
    const {id} =  req.params;
    const {uid} = req.user;
    const note = await db.collection('notelist').findOne({_id:id,uid:uid});
    if (note){
        await db.collection('notelist').deleteOne({_id:id});
        await db.collection('users').updateOne({uid:uid}, {$inc : {updatedCount:-1}});
        res.send('Deleted. Please reset the list.');
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