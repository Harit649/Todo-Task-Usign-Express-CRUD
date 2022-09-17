const db  = require('../util/database');
var jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');


exports.register = (req, res) => {

    console.log("=========== :", req.body);
    var first_name = req.body.first_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var access = req.body.access;
   
    // var inputData = {first_name : req.body.first_name, email : req.body.email, password : req.body.password, access : 1};

    if(password !== confirm_password){
        req.flash("error :", `Password & Confirm Password is not Matched`);
        res.redirect("/register");
    }
    else {
        var sql = `select * from user where email = '${email}'`; 

        db.query(sql, (err, result) => {
            if(err) throw err;

            if(result.length > 0) {
                req.flash("email is already exist");
                res.redirect("/register")
            }
            else{
                // save user data into database...
                db.query(`insert into user(first_name, email, password, confirm_password, access) values('${first_name}', '${email}', '${password}', '${confirm_password}', '${access}')`, (err, result) => {
                    if(err) throw err;
                    else{
                        res.json({
                            message : "you are succesfully registered...", 
                            result: result
                        })
                    }
                }); 
            }
        });
    }
},

// To Login user data into user table in database...

exports.login =  (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    sql = `select * from user where email = '${email}' and password = '${password}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;

        if (result.length == 0) {
            res.json({
                message : "invalid username or password"
            })
        }
        else{
            // console.log(result[0].access);
            if (result[0].access == 0) {
                res.json({
                    message : "user account is restricted by Admin..."
                })
                 //    console.log("access :",result[0].access);
            }

            const authData = jwt.sign({email : email, user_id : result[0].user_id}, "secretkey", {expiresIn : '24h'}, (err, token) => {
                if (err) throw err;
                res.json({
                    message : "login succesfully...",
                    token : token
                })
                // return token
            })
        }
    });
},

// insert Task into Task table...

exports.addTask  = (req,res) => {

    userverifyToken(req, res);

    var user_id = req.body.user_id;
    var first_name  = req.body.first_name;
    var date = req.body.date;
    var time = req.body.time;
    var description = req.body.description;

    db.query(`insert into task(user_id, first_name, date, time, description) values ('${user_id}', '${first_name}', '${date}', '${time}', '${description}')`, (err, result) => {
        
        if(err) throw err;
        else{
            res.json({
                message : "Task Succesfully Added..."
            });
        }
    });
},

//put API to update data into task table...

exports.updateTask =  (req,res) => {

    const tId = req.query.task_id;

    db.query(`update task set description = 'substrection of two number' where task_id = ${tId}`,(err,result) => {
        if(err) throw err;
        else{
            res.json({
                message : "Data updated succesfully into task table..."
            })
        }
    });
},

//Get API to Get all data(List of Task)from task table...

exports.getallTask  = (req, res) => {

    var user_id = req.body.user_id;

    db.query(`select * from task where user_id = '${user_id}'`, (err, result) => {
        if (err) throw err;
        else{
            res.json({
                task : result
            })
        }
    })
},

//Delete API to Delete data into task table...

exports.deleteTask  = (req, res) => {

    const tId = req.query.task_id;

    db.query(`delete from task where task_id = ${tId}`,(err,result) => {
        if(err) throw err;
        else{
            res.json({
                message : "Data deleted succesfully..."
            })
        }
    })
};