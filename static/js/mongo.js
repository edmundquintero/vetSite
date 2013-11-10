var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var ProductProvider = require('./productProvider').ProductProvider;
var ServiceProvider = require('./serviceProvider').ServiceProvider;

VetSiteDb = function(host, port) {
  this.db= new Db('vetsite-db', new Server(host, port, {w: 1, auto_reconnect: true}, {}));
  this.db.open(function(err, db){
    if(err){
      console.log(err);
    }
  });
};

VetSiteDb.prototype.addProviders = function(){
  ProductProvider = new ProductProvider(VetSiteDb);
  ServiceProvider = new ServiceProvider(VetSiteDb);
};

exports.VetSiteDb = VetSiteDb;