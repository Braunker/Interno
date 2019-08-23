var request = require('request');
var Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOPNAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD
});

module.exports = {
  updateInventory: (element)=>{
    return new Promise((resolve,reject)=>{
      var inventoryLevelUrl = 'https://'+process.env.SHOPIFY_API_KEY+':'+process.env.SHOPIFY_PASSWORD+'@'+process.env.SHOPIFY_SHOPNAME
      +'.myshopify.com/admin/api/'+process.env.SHOPIFY_API_VERSION+'/inventory_levels/set.json';


      request.post({url:inventoryLevelUrl,form:{'location_id': process.env.SHOPIFY_LOCATION_ID, 'inventory_item_id': element.inventory_item_id,
      'available':element.available}}, function (err, res, body) {
    		if(err){
          reject(err);
        }
        resolve(res);
    	})
    });
  },

  updatePrice: (element)=>{
    return new Promise((resolve,reject)=>{
      var inventoryItemUrl = 'https://'+process.env.SHOPIFY_API_KEY+':'+process.env.SHOPIFY_PASSWORD+'@'+process.env.SHOPIFY_SHOPNAME
      +'.myshopify.com/admin/api/'+process.env.SHOPIFY_API_VERSION+'/variants/'+element.variant_id+'.json';
      request.put({url:inventoryItemUrl,form:{"variant":{"id":element.variant_id,"price":element.price}}}, function (err, res, body) {
    		if(err){
          reject(err);
        }
        resolve(res);
    	});
    });
  }
}
