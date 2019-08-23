const apiRouter = require('express').Router();
const articleController = require('../controllers/articleController');

apiRouter.get('/',(req,res)=>{
  res.send("hello world");
});
apiRouter.get('/deleteInventory', articleController.deleteInventory);
apiRouter.post('/updateAllInventory', articleController.updateAllInventory);
apiRouter.post('/updateAllPrices', articleController.updateAllPrices);


module.exports = apiRouter;
