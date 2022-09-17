const express = require('express');
const path = require('path');
const { check, body } = require('express-validator');

const router = express.Router();
const middleware = require('../middleware/authentication');
const adminController = require('../controller/admin');

// router.post('/login',[
//     check('email')
//     .isEmail()
//     .withMessage('Please enter a valid email.')
//     .normalizeEmail(),
//     body(
//         'password',
//         'Please enter a password with only numbers and text and at least 5 characters.'
//         )
//         .isLength({ min: 5, max:10})
//         .isAlphanumeric()
//         .trim()
// ] , adminController.adminLogin);

// router.post('/add-user',[
//     check('email').isEmail()
//       .withMessage('Please enter a valid email.')
//       .normalizeEmail(),
//       body(
//         'password',
//         'Please enter a password with only numbers and text and at least 5 characters.'
//       )
//         .isLength({ min: 5, max: 10 })
//         .isAlphanumeric()
//         .trim()
// ] , adminController.addUser);

router.post('/adminLogin', middleware.adminverifyToken, adminController.adminLogin); 
router.post('/addUser', middleware.adminverifyToken, adminController.addUser); 

router.get('/getallUser', middleware.adminverifyToken, adminController.getallUser); 
router.delete('/removeUser', middleware.adminverifyToken, adminController.removeUser);
router.get('/getallTask', middleware.adminverifyToken, adminController.getallTask);
router.post('/addTask', middleware.adminverifyToken, adminController.addTask);
router.delete('/removeTask', middleware.adminverifyToken, adminController.removeTask);
router.post('/suspend', middleware.adminverifyToken, adminController.suspend);
router.get('/maxTodoTask', middleware.adminverifyToken, adminController.maxTodoTask);
router.get('/findUser', middleware.adminverifyToken, adminController.findUser);

module.exports = router;
