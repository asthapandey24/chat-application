const sequelize=require('sequelize');
const Sequelize=require('../util/Databaseconnection');

const msgtable=Sequelize.define('msgdetail',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    message:sequelize.TEXT
});

module.exports=msgtable;