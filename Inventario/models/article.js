var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema   = new Schema({
    sku: String,
    price: String,
    inventory_item_id: Number,
    available: Number
});

module.exports = mongoose.model('Article', ArticleSchema);
