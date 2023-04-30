const express=require('express');
const router=express.Router();
const messageController=require('../controllers/message')
const authenticate=require('../middleware/auth');

  router.post('/addchat',authenticate.authentication,messageController.Adduserchat);
  router.get('/getchat',authenticate.authentication,messageController.getdata)
  router.get('/getNewChat', authenticate.authentication,messageController.getNewData)

  module.exports = router;
  