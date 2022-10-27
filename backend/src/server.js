import fs from 'fs';
import admin from 'firebase-admin';
import express from "express";
import 'dotenv/config';
import {db , connectToDb } from './db.js'
/* 
// section to make the all project file
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get(/^(?!\/api).+/,(req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
*/

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
//app.use(express.static(path.join(__dirname,'../build'))); // function that build the website
// middleware
app.use( async (req, res , next) => {
  const { authtoken } = req.headers;
  if(authtoken){
    try{
      req.user = await admin.auth().verifyIdToken(authtoken);

    } catch(e){
      return res.sendStatus(400);
    }
  }
  req.user = req.user || {};

});

app.get('/api//articles/:name', async (req, res)=>{
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection('articles').findOne({name});

  if(article){


    const upvoteIds = article.upvoteIds || [] ;
    article.canUpvote = uid && !upvoteIds.includes(uid);
    res.send(article);
  }else{
    res.sendStatus(404);
  }
})


app.use((req,res,next) =>{
  if(req.user){
    next();
  } else{
    res.sendStatus(401);
  }
});

app.put('/api/articles/:name/upvote', async (req,res) => { 
  const { name } = req.params;
  const { uid } = req.user;
  const article = await db.collection('articles').findOne({name});

  if(article){
    const upvoteIds = article.upvoteIds || [] ;
    const canUpvote = uid && !upvoteIds.includes(uid);
    
    if(canUpvote){
      await db.collection('articles').updateOne({ name }, {
        $inc: {upvotes: 1},
        $push: {upvoteIds:uid},
      });
    }
    const updatedArticle = await db.collection('articles').findOne({name});
    res.json(updatedArticle)
  } else {
    res.send(`the article has not  found the article`)
  }
});


app.post('/api/articles/:name/comments', async (req, res)=>{
    const { name } = req.params;
    const{ text} = req.body;
    const { email } = req.user;
   // const article = articleInfo.find(a => a.name === name);

 
  await db.collection('articles').updateOne({ name }, {
    $push: {comments: {postedBy: email, text}},
  });

  const article = await db.collection('articles').findOne({name});

  if(article){
  
      res.json(article);
  }else {
    res.send(`the article has not  found the article`)
  }

});


const PORT = process.env.PORT || 8000; // what port you develop

  connectToDb(()=>{
    console.log('connected to Db');
    app.listen(PORT ,() => {
      console.log('server work' + PORT)
    })
  });
