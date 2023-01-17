const Article = require('../models/article');
const shopify = require('../services/shopifyService');

exports.deleteInventory = (req,res)=>{
  //clear all current inventory
  Article.deleteMany({},(err)=>{
    if(err){
      console.log(err);
    }
    res.send("cleared all articles from DB");
  });
}

exports.updateAllInventory= (req,res)=>{
  let articleArray = [];
  let i =0;
  let k =0;

  req.body.articles.forEach((element)=>{ //update inventory of each item in req.body
    console.log(element);
    Article.updateOne({sku:element.sku},{$set:{available:element.available, inventory_item_id:element.inventory_item_id,
      variant_id:element.variant_id, product_id:element.product_id}},{upsert:true},(err,response)=>{
        if(err){
          console.log(err);
        }
        else{
          shopify.updateInventory(element).then((response)=>{
            i = i + 1;

            articleArray.push(element); //if succesfully updated in shopify, add article sku to array of response
            //send response if we are through with the articles sent by request
            if(i == req.body.articles.length){
              res.send("Succesfully updated inventory of (success/sent): "+articleArray.length+"/"+req.body.articles.length);
            }
          }).catch((err)=>{
            console.log(err);
          });
        }
    });
  });
}

exports.updateAllPrices= (req,res)=>{
  let i =0;


  req.body.variant.forEach((element)=>{ //update prices of each item in req.body
    console.log(element);
    Article.updateOne({sku:element.sku},{$set:{price:element.price, inventory_item_id:element.inventory_item_id, variant_id:element.variant_id, product_id:element.product_id}}
      ,{upsert:true},(err,response)=>{
        if(err){
          console.log(err);
        }
        else{
          shopify.updatePrice(element).then(()=>{
            i = i + 1;

            articleArray.push(element.sku); //if succesfully updated in shopify, add article sku to array of response
            //send response if we are through with the articles sent by request
            if(i == req.body.variant.length){
              res.send("Succesfully updated prices of (success/sent): "+articleArray.length+"/"+req.body.variant.length);
            }
          }).catch((err)=>{
            i = i + 1;
            if(i == req.body.variant.length){
            }
          });
        }
    });
  });
}

exports.updateOneInventory= (req,res)=>{
  Article.updateOne({inventory_item_id:req.body.inventory_item_id},{$set:{available:req.body.available}},(err,qry)=>{
    if(err){
      res.send("article with inventoryId"+req.body.inventory_item_id+" not in our DB");
    }
    else{
      console.log("article with inventoryId"+req.body.inventory_item_id+" updated");
      res.send("article with inventoryId"+req.body.inventory_item_id+" updated");
    };
  })
}
