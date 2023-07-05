const sequelize=require('sequelize');
const Sequelize=require('../util/Databaseconnection');

const ArchivedChat=Sequelize.define('archivedChat', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    message: sequelize.TEXT,
    timestamp: sequelize.DATE,
  }, {
    tableName: 'ArchivedChat', // Specify the desired table name
    timestamps: false // Set to false if you don't want timestamps (created_at, updated_at)
  });

  module.exports=ArchivedChat;
