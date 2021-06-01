require("dotenv").config
const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const app = express();
const path = require('path')

app.set("view engine" ,"ejs");
app.use(require("compression")());
app.use(morgan("tiny"))
app.use(express.static(path.join(__dirname + "/public")))

// application routes
app.use(require("./api/routes/app")(express));
app.use(require("./api/routes/admin")(express))
app.use(require("./api/routes/authentication")(express))


app.use((req,res, next)=>{
    res.render("404.ejs")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`)
})