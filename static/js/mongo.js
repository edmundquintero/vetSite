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
    if( error ) {
      callback(error);
    }else{
     callback(null, product_collection);
   }
  });
};

VetSiteDb.prototype.getProductList = function(callback){
  this.getProductsCollection(function(error, product_collection) {
    if( error ){
      callback(error);
    }else{
      product_collection.find().toArray(function(error, results) {
        if( error ){
          callback(error);
        }else{
          callback(null, results);
        }
      });
    }
  });
};

VetSiteDb.prototype.getProduct = function(id, callback){
  this.getProductsCollection(function(error, product_collection) {
    if( error ){
      callback(error);
    }else{
      if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
      product_collection.find({_id: ObjectID(id) }).toArray(function(error, results) {
        if( error ){
          callback(error);
        }else{
          callback(null, results[0]);
        }
      });
    }
  });
};



VetSiteDb.prototype.testdata = function(){
  this.getProductsCollection(function(error, product_collection) {

    product_collection.remove();

    product_collection.save(
                            {type: 'product',
                             name: 'food1',
                             title: '',
                             description: 'Dog food made for dogs! brand #1'
                            },
                            function(err, records){
                              console.log("Added: "+records.name);
    });
    product_collection.save(
                            {type: 'product',
                             name: 'food2',
                             title: '',
                             description: 'Dog food made for dogs! brand #2'
                            },
                            function(err, records){
                              console.log("Added: "+records.name);
    });
    product_collection.save(
                            {type: 'product',
                             name: 'food3',
                             title: '',
                             description: 'Dog food made for dogs! brand #3'
                            },
                            function(err, records){
                              console.log("Added: "+records.name);
    });
  });



};

exports.VetSiteDb = VetSiteDb;