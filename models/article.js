var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema   = new Schema({
    sku: {type: String, required:true},
    price: {type:Number, default:0},
    variant_id: {type: Number, required:true},
    inventory_item_id: {type: Number, required:true},
    available: {type:Number, default:0}
});

module.exports = mongoose.model('Article', ArticleSchema);
