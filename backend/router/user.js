const express=require('express');
const router=express.Router();
const signupController=require('../controllers/signup')
const userDetailController= require('../controllers/message')
const authentication=require('../middleware/auth');

router.post('/signup',signupController.signup);
router.post('/login',signupController.login);
router.get('/UserDetail',authentication.authentication,userDetailController.UserDetail);
router.get('/AddNewUser',authentication.authentication,signupController.AddNerUser)

module.exports = router;
