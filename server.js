const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const config = require('./config.json')

const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res){
    res.sendFile(__dirname + "/public/login.html");
});

app.route('/login')
    .get(/*sessionChecker,*/ (req, res) => {
        /*
        res.render('login',{
            title:'login',
        });    */
        res.sendFile(__dirname + "/public/login.html");
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password,
			usertype = req.body.usertype;
    });


//Start the server
app.listen(PORT, () =>console.log(`Listening on ${ PORT }`));