const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const sequelize=require('./util/Databaseconnection');
const userRouter = require('./router/user')
const path=require('path');

const cors=require('cors')
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const usertable = require('./models/Usertable')






app.use(userRouter);




sequelize.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})