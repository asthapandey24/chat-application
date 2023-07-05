const sequelize=require('sequelize');
const cron = require('node-cron');
const ArchivedChat = require('./archivedChat');
const msgtable=require('../models/msgtable');
const {Op} = require('sequelize'); 



cron.schedule('0 1 * * *', async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
      // Find messages older than one day
      const messagesToArchive = await msgtable.findAll({
        where: {
          createdAt: { [Op.lt]: oneDayAgo, },
        },
      });
      await ArchivedChat.bulkCreate(messagesToArchive.map((msg) => {
        return {
          message: msg.message,
          timestamp: msg.createdAt,
        };
      }));
      await msgtable.destroy({
        where: {
          createdAt: {
            [Op.lt]: oneDayAgo,
          },
        },
      });
  
      console.log('Chat messages archived and deleted successfully!');
    } catch (error) {
      console.error('Error archiving and deleting chat messages:', error);
    }
  });
  
  // ...
  
    