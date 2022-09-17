const express = require("express");
const app = express();
// const mysql = require("mysql");
const path = require("path");
// const ejs = require('ejs');
const bodyParser  = require("body-parser");
var flash = require('connect-flash');
// var jwt = require("jsonwebtoken");
var session = require('express-session');

// const db = require('./util/database').default;
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.set('views',path.join(__dirname,'views'));
// app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) // To read data, it needs and permission which is give n through this express.Json...
app.use(session({
    cookie : {maxage: 6000},
    secret : "secret",
    resave : true,
    saveUninitialized : true
}));

app.listen(4000, () => {console.log("Server is running on 8082.");}) 