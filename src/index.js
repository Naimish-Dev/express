const express = require("express");
const app = express();
const path = require("path");
var requests = require('requests');
const hbs = require("hbs");
const port = process.env.PORT || 8000
app.set('view engine', 'hbs');

const hbspath = path.join(__dirname, "../template/partials")
hbs.registerPartials(hbspath);

const newpath = path.join(__dirname, "../template/views")
app.set("views", newpath)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about/*", (req, res) => {
    res.render("404")
})

app.get("/about", (req, res) => {
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=326c099a3438886bcb8ce829b4870560`
    ).on('data',  (chunk)=> {
        const jdata=JSON.parse(chunk)
        const ardta=[jdata]
       res.render("about",{change:`my city name is ${ardta[0].name}`})    
    })
    .on('end', function (err) {
      if (err){
         res.write(err);
      } 
    //   res.end("")
    });
})

app.get("contact", (req, res) => {
    res.render("contact")
})

app.get("*", (req, res) => {
    res.render("404")
})

app.listen("8000", () => {
    console.log("server runing")
})