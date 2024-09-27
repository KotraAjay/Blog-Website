import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';

const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

var dataList=[];
var count=0;

app.get("/",(req,res)=>{
    res.render("index.ejs",{dataList: dataList});
});

app.get("/create",(req,res)=>{
    res.render("partials/create.ejs",{title: '',matter: '',author: '',tata: ''});
});



app.post("/",(req,res)=>{
    count++;
    var data={
        title: req.body["title"],
        matter: req.body["matter"],
        author: req.body["author"],
        count: count
    }
    dataList.push(data);
    res.redirect("/");
});


app.post("/delete",(req,res)=>{
    var indx=req.body.buttonIndex;
    dataList.splice(indx,1);
    res.redirect("/");
});

app.post("/edit",(req,res)=>{
    var indx=req.body.buttonIndex;
    var tata={
        title: dataList[indx].title,
        matter: dataList[indx].matter,
        author: dataList[indx].author
    }
    console.log(tata);
    dataList.splice(indx,1);
    res.render("partials/create.ejs",{tata: tata});
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});