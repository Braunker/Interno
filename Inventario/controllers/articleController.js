const Article = require('../models/article');
const shopify = require('../services/shopifyService');

exports.updateAllInventory= (req,res)=>{
  Article.remove(); //clear all current inventory

  req.body.articles.forEach((element)=>{ //update inventory of each item in req.body
    Article.update({sku:element.sku},{$set:{available:element.available, price:element.price, inventory_item_id:element.inventory_item_id}}
      ,{upsert:true},(err,article)=>{
      if(article){
        shopify.updateInventoryAndPrice(article).then(()=>{
          res.send("updated "+article.sku+" succesfully in DB and Shopify")
        }).catch((err)=>{
          next(err);
        });
      }
    });
  });

}

exports.update= (req,res)=>{
  Article.update({inventory_item_id:req.body.inventory_item_id},{$set:{available:req.body.available}},(err,article)=>{
    if(article){
      res.send("updated "+article.sku+" succesfully in DB")
    }
    else{
      res.send("article with inventoryId"+req.body.inventory_item_id+" not in our DB")
    }
  });
}

exports.removeAll = (req,res)=>{
  Article.remove();
  res.send('removed all articles from DB!')
}
