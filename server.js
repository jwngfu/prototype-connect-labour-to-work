const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const http = require('http');
const config = require('./config.json')
const pg = require('pg')
const pool = new pg.Pool(config.pg)

const PORT = process.env.PORT || 5000

pool.query("CREATE TABLE IF NOT EXISTS userData ( phoneNumber int PRIMARY KEY, userType int, name text, password text, address text, adharNumber int);", (err, res) => {
    //console.log(err, res);
    //pool.end();
});



// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: false }));

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
        var username = req.body.email;
        var password = req.body.password;
        console.log(username, password);
        res.send("username : " + username);
    });

app.route('/register')
    .get(/*sessionChecker,*/ (req, res) => {
        /*
        res.render('login',{
            title:'login',
        });    */
        res.sendFile(__dirname + "/public/register.html");
    })
    .post((req, res) => {
        var 
            phoneNumber = req.body.phoneNumber,
            userType = req.body.userType,    
            name = req.body.name,
            password = req.body.password,
            address = req.body.address,
            adharNumber = req.body.adharNumber;
        pool.query("INSERT INTO userData(phonenumber, usertype, name, password, address, adharnumber) VALUES (" + phoneNumber + ", 0, " + name + ", " + password + "," + address + "," + adharNumber + ");", (err, res) => {
            console.log(err, res);
            //pool.end();
        });
    });


//Start the server
app.listen(PORT, () =>console.log(`Listening on ${ PORT }`));