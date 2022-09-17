const express = require('express');
const { check, body, validationResult } = require('express-validator');
const path = require('path');

const router  = express.Router();
const userController = require('../controller/user');
const middleware = require('../middleware/authentication');



// router.post('/login', (req, res) => {
//     console.log("login req",req.body);

//     var email = req.body.email;
//     var password = req.body.password;

//     sql = `select * from user where email = '${email}' and password = '${password}'`;
//     db.query(sql, (err, result) => {
//         if(err) throw err;

//         if (result.length == 0) {
//             res.json({
//                 message : "invalid username or password"
//             })
//         }
//         else{
//             // console.log(result[0].access);
//             if (result[0].access == 0) {
//                 res.json({
//                     message : "user account is restricted by Admin..."
//                 })
//                  //    console.log("access :",result[0].access);
//             }

//             const authData = jwt.sign({email : email, user_id : result[0].user_id}, "secretkey", {expiresIn : '24h'}, (err, token) => {
//                 if (err) throw err;
//                 res.json({
//                     message : "login succesfully...",
//                     token : token
//                 })
//                 // return token
//             })
//         }
//     });
// });


// router.post('/login', [
//     check('email')
//     .isEmail()
//     .withMessage('please eneter a valid email...')
//     .normalizeEmail(),
//     body(
//         'password',
//         'Please enter a password with only numbers and text with min 5 characters.'
//     )
//     .isLength({min : 5, max:10})
//     .isAlphanumeric()
//     .trim()
// ], userController.login);

// router.get('/register-user', [
//     check('email')
//     .isEmail()
//     .withMessage('please eneter a valid email...')
//     .normalizeEmail(),
//     body(
//         'password',
//         'Please enter a password with only numbers and text with min 5 characters.'
//     )
//     .isLength({min : 5, max: 10})
//     .isAlphanumeric()
//     .trim()
//     .custom((value, { req }) => {
//         if (value !== req.body.password) {
//           throw new Error('Passwords have to match!');
//         }
//         return true;
//       })
// ], userController.register);

router.post('/register', middleware.userverifyToken, userController.register);
router.post('/login', middleware.userverifyToken, userController.login);

router.post('/addTask', middleware.userverifyToken, userController.addTask);
router.put('/updateTask', middleware.userverifyToken, userController.updateTask);
router.get('/getallTask', middleware.userverifyToken, userController.getallTask);
router.delete('/deleteTask', middleware.userverifyToken, userController.deleteTask);

module.exports = router;

// , middleware.userverifyToken