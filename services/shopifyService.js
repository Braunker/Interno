var request = require('request');
var ThrottledQueue = require('throttled-queue');
var Shopify = require('shopify-api-node');

var throttle = new ThrottledQueue(2,1000);

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

      throttle(function(){
        request.post({url:inventoryLevelUrl,form:{'location_id': process.env.SHOPIFY_LOCATION_ID, 'inventory_item_id': element.inventory_item_id,
        'available':element.available}}, function (err, res, body) {
      		if(err){
            console.log(err);
            reject(err);
          }
          resolve(res);
      	});
      });
    });
  },
  updatePrice: (element)=>{
    return new Promise((resolve,reject)=>{
      var inventoryItemUrl = 'https://'+process.env.SHOPIFY_API_KEY+':'+process.env.SHOPIFY_PASSWORD+'@'+process.env.SHOPIFY_SHOPNAME
      +'.myshopify.com/admin/api/'+process.env.SHOPIFY_API_VERSION+'/variants/'+element.variant_id+'.json';
      throttle(function(){
        request.put({url:inventoryItemUrl,form:{"variant":{"id":element.variant_id,"price":element.price}}}, function (err, res, body) {
      		if(err){
            reject(err);
          }
          resolve(res);
      	});
      });
    });
  },
  /*updateAvailableTag: (element)=>{
    return new Promise((resolve,reject)=>{
      var productGetTagsUrl ='https://'+process.env.SHOPIFY_API_KEY+':'+process.env.SHOPIFY_PASSWORD+'@'+process.env.SHOPIFY_SHOPNAME
      +'.myshopify.com/admin/api/'+process.env.SHOPIFY_API_VERSION+'/products/'+element.product_id+'.json?fields=tags';

      var productPutTagsUrl = 'https://'+process.env.SHOPIFY_API_KEY+':'+process.env.SHOPIFY_PASSWORD+'@'+process.env.SHOPIFY_SHOPNAME
      +'.myshopify.com/admin/api/'+process.env.SHOPIFY_API_VERSION+'/products/'+element.product_id+'.json';
      var tags="";

      throttle(function(){
        request.get({url:productGetTagsUrl}, (error,response,body)=>{
        tags = body.product.tags;
        if(element.available>0){
          if(tags.includes(", available")){
            resolve();
          }
          else{
            tags=tags+", available";
            throttle(function(){
              request.put({url:productPutTagsUrl, form:{"product":{"id":element.product_id,"tags":tags}}},function(err,res,body){
                if(err){
                  reject(err);
                }
                resolve(res);
              })
            })
          }
        }
        else{
          if(tags.includes(", available")){
            tags=tags.replace(", available","");
            throttle(function(){
              request.put({url:productPutTagsUrl, form:{"product":{"id":element.product_id,"tags":tags}}},function(err,res,body){
                if(err){
                  reject(err);
                }
                resolve(res);
              })
            })
          }
          else{
            resolve();
          }
        }
        })
      })
    })
  }*/
}
