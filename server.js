const express = require('express');
const app = express();
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res){
    res.sendFile(__dirname, "public/login.html");
});



//Start the server
app.listen(PORT, () =>console.log(`Listening on ${ PORT }`));