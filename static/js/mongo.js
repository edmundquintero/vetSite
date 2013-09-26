var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

VetSiteDb = function(host, port) {
  this.db= new Db('vetsite-db', new Server(host, port, {w: 1, auto_reconnect: true}, {}));
  this.db.open(function(){});
  this.db.collection('products', {});
};

VetSiteDb.prototype.getProducts = function(callback){
  this.db.collection('products', function(error, product_collection) {
    product_collection.find({name: 'Edmund'}).toArray( function(error, results) {
        console.log("find: " +results + "ERROR:"+error);
      });
    if( error ) callback(error)
    else callback(null, product_collection)
  });
};

VetSiteDb.prototype.getAllProducts = function(callback){
  this.getProducts(function(error, product_collection) {
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
  this.getProducts(function(error, product_collection) {
    product_collection.insert({name: 'Edmund', title: 31}, function(err, records){
      console.log("Record added as "+records[0].name);
    });
  });
};

exports.VetSiteDb = VetSiteDb;