import express from 'express';
import pg from 'pg';
import  bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

const port = 3000;

const books = [ {title: "Atomic habits", isbn_code : 87555 ,dte : new Date("2022-05-25"), rating: 5,urls : "https://covers.openlibrary.org/b/isbn/0385472579-S.jpg"}  ,
{title: "The Subtle art of not giving a fuck", isbn_code : 87555 ,dte : new Date("2024-05-25"), rating: 7, urls : "https://covers.openlibrary.org/b/isbn/0735211299-S.jpg"},
{title: "Atomic habits 2", isbn_code : 87555 ,dte : new Date("2022-05-25"), rating: 5, urls : "https://covers.openlibrary.org/b/isbn/0062641549-S.jpg"}    


]

const Apiurl = "https://covers.openlibrary.org/b/isbn/0385472579-S.jpg";
app.use(bodyParser.urlencoded({ extended: true }));

//ED7D31 brown
// 6C5F5B grey
//F6F1EE white
app.get("/",(req,res)=>{
    res.render("index.ejs",{books});
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})


//can use isbn code to get the image
