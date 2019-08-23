var whRouter = require('express').Router();
var articleController = require('../controllers/articleController');

whRouter.get('/',(req,res)=>{
  res.send("hello world!");
});


whRouter.post('/inventorylevelupdate', articleController.updateOneInventory);

module.exports = whRouter;
