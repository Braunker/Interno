var request = require('request');
var Shopify = require('shopify-node-api');
var shopify;
shopify = new Shopify({
  shopname: process.env.SHOPIFY_SHOPNAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD
});

module.exports = {
  updateInventoryAndPrice: (element)=>{
    return new Promise((resolve,reject)=>{
      var inventoryLevelUrl = 'https://'+process.env.SHOPIFY_API_KEY+':'+process.env.SHOPIFY_PASSWORD+'@'+process.env.SHOPIFY_SHOPNAME
      +'.myshopify.com/admin/api/'+process.env.SHOPIFY_API_VERSION+'/inventory_levels/set.json';
      var inventoryItemUrl = 'https://'+process.env.SHOPIFY_API_KEY+':'+process.env.SHOPIFY_PASSWORD+'@'+process.env.SHOPIFY_SHOPNAME
      +'.myshopify.com/admin/api/'+process.env.SHOPIFY_API_VERSION+'/inventory_items/#'+element.inventory_item_id+'.json';

      request.post(inventoryLevelUrl,{'location_id':process.env.SHOPIFY_LOCATION_ID, 'inventory_item_id':element.inventory_item_id,
      'available':element.inventory_quantity}, function (err, res, body) {
    		if(err){
          reject(err);
        }
        request.post(inventoryItemUrl,{"inventory_item":{"id":element.inventory_item_id,"cost":element.price}}, (err,res,body)=>{
          if(err){
            reject(err);
          }
          resolve(res);
        })
    	})
  }


}
