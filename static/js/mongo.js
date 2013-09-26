var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

VetSiteDb = function(host, port) {
  this.db= new Db('vetsite-db', new Server(host, port, {w: 1, auto_reconnect: true}, {}));
  this.db.open(function(err, db){
    if(err){
      console.log(err);
    }
  });
};

VetSiteDb.prototype.getProductsCollection = function(callback){
  this.db.collection('products', function(error, product_collection) {
    if( error ) callback(error)
    else callback(null, product_collection)
  });
};

VetSiteDb.prototype.getAllProducts = function(callback){
  this.getProductsCollection(function(error, product_collection) {
    if( error ) callback(error)
    else {
      product_collection.find().toArray(function(error, results) {
        if( error ) callback(error)
        else callback(null, results)
      });
    }
  });
};



VetSiteDb.prototype.testdata = function(){
  this.getProductsCollection(function(error, product_collection) {

    product_collection.remove();

    product_collection.save({name: 'food1', title: ''}, function(err, records){
      console.log("Added: "+records.name);
    });
    product_collection.save({name: 'food2', title: ''}, function(err, records){
      console.log("Added: "+records.name);
    });
    product_collection.save({name: 'food3', title: ''}, function(err, records){
      console.log("Added: "+records.name);
    });
  });
};

exports.VetSiteDb = VetSiteDb;