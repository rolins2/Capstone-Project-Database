import express from 'express';
import pg from 'pg';
import  bodyParser from 'body-parser';

const app = express();

const port = 3000;

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

//can use isbn code to get the image
