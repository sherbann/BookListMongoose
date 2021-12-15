const express = require('express')
const router = require('./router')
const app = express()
const port = process.env.PORT || 3001
const mongoose = require('mongoose');

app.use(express.json())
app.use(router)
const uri = "mongodb+srv://mongo-DevAcademy:sheffield22@cluster0.buz9v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri);

app.listen(port, () => {
    console.log(`Book List app at http://localhost:${port}`)
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Database Connected")
})