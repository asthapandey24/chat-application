const { DatabaseError, DataTypes } = require('sequelize');
const sequelize=require('../util/Databaseconnection');

const grouptable=sequelize.define('grouptable',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupName:{
        type:DataTypes.STRING,
        unique: true

    }
});





module.exports=grouptable;