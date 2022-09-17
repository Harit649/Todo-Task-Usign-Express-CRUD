const db = require('../util/database');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.adminLogin =  (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    db.query(`select * from admin where email = '${email}' and password = '${password}'`, (err, result) => {
        if(err) throw err;
        else{
            if (result.length == 0) {
                res.json({
                    message : "invalid email and password..."
                })
            }
            else{
               const authData =  jwt.sign({email : email, password : password}, 'adminsecretkey', {expiresIn : '24h'}, (err, token) => {
                    if(err) throw err;
                    else{
                        res.json({
                            message : "Admin succesfully loggedin...",
                            token : token
                        })
                    }
                });
            }
        }
    });
},

// get API to get list of all the users...
exports.getallUser =  (req, res) => {

    db.query(`select * from user`, (err, result) => {
        if (err) throw err;
        else{
            res.json({
                task : result
            })
        }
    })
},

// to add user from admin side...
exports.addUser = (req, res) => {

    var first_name = req.body.first_name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    var access = req.body.access;

    db.query(`select * from user where email = '${email}'`, (err, result) => {
        if(err) throw err;
        else{
            if (result.length !== 0) {
                res.json({
                    message : "user already exiist..."
                })
            }
            else{
                db.query(`insert into user(first_name, email, password, confirm_password, access) values ('${first_name}' , '${email}' , '${password}', '${confirm_password}', '${access}')`, (err,result) =>{
                    if(err) throw err;
                    else{
                        res.json({
                            message : "user created succesfully, from Admin side..."
                        })
                    }
                });
            }
        }
    });
},

// to remove user from admin side...

exports.removeUser  = (req, res) => {

    var user_id = req.body.user_id;

    db.query(`delete from user where user_id = '${user_id}'`, (err, result) => {
        if(err) throw err;
        else{
            res.json({
                message : "user succefully removed from admin side..."
            })
        }
    })
},

// list of all Todo task from admin side...

exports.getallTask  = (req, res) => {

    db.query(`select * from task`, (err, result) => {
        if (err) throw err;
        else{
            res.json({
                task : result
            })
        }
    })
},

// to add Todo task from admin side...

exports.addTask  = (req,res) => {

    var user_id = req.body.user_id;
    var first_name  = req.body.first_name;
    var date = req.body.date;
    var time = req.body.time;
    var description = req.body.description;

    db.query(`insert into task(user_id, first_name, date, time, description) values ('${user_id}', '${first_name}', '${date}', '${time}', '${description}')`, (err, result) => {
        
        if(err) throw err;
        else{
            res.json({
                message : "Task Succesfully Added from Admin side..."
            });
        }
    });
},


// to remove Todo Task from admin side...

exports.removeTask  = (req, res) => {

   var task_id = req.body.task_id;

    db.query(`delete from task where task_id = '${task_id}'`, (err, result) => {
        if(err) throw err;
        else{
            res.json({
                message : "Task succesfully removed from admin side..."
            })
        }
    })
},

// suspend the login authentication of perticular user from Admin side...

exports.suspend  = (req, res) => {

    var user_id = req.body.user_id;
    var access = req.body.access == '0' ? 0 : 1;

    // var access = function() {
    //     if (req.body.access == '0') {
    //         return 0;
    //     }
    //     else{
    //         return 1;
    //     }
    // }
    db.query(`update user set access = '${access}' where user_id = '${user_id}'`, (err, result) => {
        if(err) throw err;
        else{
            res.json({
                message : "Access is suspended from user to perticular user..."
            })
        }
    })
},

exports.maxTodoTask  = (req, res) => {

    sql = `select first_name from user where user_id in (select user_id from
        (SELECT user_id , COUNT(user_id) mycount FROM task GROUP BY user_id) as user_task_count_1
        WHERE mycount = (select max(mycount) from
        (SELECT user_id , COUNT(user_id) mycount FROM task GROUP BY user_id) as user_task_count_2))
        group by first_name`;

    db.query(sql, (err, result) => {
        if(err) throw err;
        else{
            maxTaskUser : result
        }
    })
},

exports.findUser  = (req, res) => {

    const first_name = req.body.first_name;
    const description = req.body.description;

    var currentPage = req.body.currentPage;
    let pageSize = 10;
    let skip = Number(pageSize * (currentPage - 1));

   // select first_name from task where first_name LIKE '%hard%' && description LIKE '%two%' group by first_name;

//    sql  = `select * from task where first_name = '${first_name}' and description = '${description}' group by first_name limit '${skip}','${currentPage}'`;
//    console.log("sql : ", sql);

    db.query(`select first_name from task where first_name like binary '%${first_name}%' && description LIKE '%${description}%' group by first_name limit ${skip},${pageSize}`,(err, result) => {
        if(err) throw err;
        else{
            res.json({  
                user : result
            })
        }
    })

};