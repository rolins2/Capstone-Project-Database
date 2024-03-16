import express, { response } from 'express';
import pg from 'pg';
import  bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
app.use(express.static("public"));


const port = 3000;

const booksz = [ {title: "Atomic habits", isbn_code : 87555 ,dte : new Date("2022-05-25"), rating: 5,urls : "https://covers.openlibrary.org/b/isbn/0385472579-S.jpg"}  ,
{title: "The Subtle art of not giving a fuck", isbn_code : 87555 ,dte : new Date("2024-05-25"), rating: 7, urls : "https://covers.openlibrary.org/b/isbn/0735211299-S.jpg"},
{title: "Atomic habits 2", isbn_code : 87555 ,dte : new Date("2022-05-25"), rating: 5, urls : "https://covers.openlibrary.org/b/isbn/0062641549-Sx.jpg"}    


]

const Apiurl = "https://covers.openlibrary.org/b/isbn/0385472579-S.jpg";
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user : "postgres",
    host: "localhost",
    database : "bookrec",
    password: "r8FbTfBr",
    port: 5432,
});

db.connect();

//ED7D31 brown
// 6C5F5B grey
//F6F1EE white


app.post("/addBooks",async (req,res)=>{
    console.log(req.body);

        const bookName = req.body.bName;
        const bookIsbnn = req.body.bIsbn;
        const bookRating = req.body.bRating;
        const bookDate = req.body.bDate;
        const bookDescrip = req.body.bDesc;

        

    try{
            let res = db.query("INSERT INTO books (title,isbn, rating, readdate, reviews) VALUES($1,$2, $3 ,$4 , $5)  RETURNING *" ,[bookName , bookIsbnn , bookRating , bookDate ,bookDescrip]);

    }catch(err){
        console.log("Error "+err);
        res.render("addBook.ejs");


    }
    res.redirect("/");



})

app.get("/edit",async (req,res)=>{

    //console.log(req.query.bname);
    let bookName = req.query.bname;
    let items = [];


    try{
        let result  =  await db.query("SELECT * FROM books WHERE id = $1",[bookName]);
        let book1 = result.rows[0];

        console.log("result rows "+result.rows);

        console.log(bookName);

        result.rows.forEach((ct)=>{items.push(ct)});

        console.log(book1);

        console.log(items);
        

    }catch(err){
        console.log(" Error in databse "+err);
    }

    res.render("edit.ejs",{items});
})


app.get("/delete",(req,res)=>{

    console.log("delete button hit");
})

app.get("/addBook", (req,res)=>{
    res.render("addBook.ejs");
})

app.get("/",async (req,res)=>{
    let books = [];

    try{


        let result = await db.query("SELECT * FROM books")

     

          books = result.rows;
            // const response = await axios.get(Apiurl);

            // for(let i =0;i < dbs.length;i++){
            //     console.log(result.rows[i].title);
            // }
            
            // console.log(response.data);
    }catch(err){

        console.log(err);

    }
    res.render("index.ejs",{books});
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})


//can use isbn code to get the image
