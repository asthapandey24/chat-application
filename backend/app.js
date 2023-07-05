const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const sequelize=require('./util/Databaseconnection');
const userRouter = require('./router/user')
const msgRouter = require('./router/chatmsg')
const groupRoute=require('./router/group')
const path=require('path');

const cors=require('cors')
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const usertable = require('./models/Usertable')
const msgtable = require('./models/msgtable')
const grouptable=require('./models/grouptable');
const usergrouptbble=require('./models/usergroup');
const archivedtable=require('./models/archivechat');




app.use(userRouter);
app.use(msgRouter);
app.use(groupRoute);

usertable.hasMany(msgtable);
msgtable.belongsTo(usertable)

grouptable.hasMany(msgtable);
msgtable.belongsTo(grouptable);




usertable.belongsToMany(grouptable,{ through: usergrouptbble });
grouptable.belongsToMany(usertable, { through: usergrouptbble });


grouptable.hasMany(usergrouptbble);         
usertable.hasMany(usergrouptbble);         


sequelize.sync({force: false})
.then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})