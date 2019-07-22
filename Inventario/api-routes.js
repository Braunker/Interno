var router = require('express').Router();
var articleController = require('./contollers/articleController');
var shopify = require('./services/shopifyService');

router.post('/updateAllInventory', articleController.updateAllInventory);

module.exports = router;
