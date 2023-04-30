const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const sequelize=require('./util/Databaseconnection');
const userRouter = require('./router/user')
const msgRouter = require('./router/chatmsg')
const path=require('path');

const cors=require('cors')
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const usertable = require('./models/Usertable')
const msgtable = require('./models/msgtable')






app.use(userRouter);
app.use(msgRouter);


usertable.hasMany(msgtable);
msgtable.belongsTo(usertable)

sequelize.sync()
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})