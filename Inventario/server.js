var express = require('express');
var app = express();
var mysql = require('mysql');
var router = require('express').Router();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // bodyParser, this will let us get the data from a POST
app.use(bodyParser.json());

//ShopifyWebhooks
var shopifyWebhooks = require('express-shopify-webhooks');

app.use('/webhooks', shopifyWebhooks({
    directory: path.join(__dirname, '/webhooks'),
    shopify_shared_secret: process.env.SHOPIFY_SHARED_SECRET
}));
