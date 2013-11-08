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

VetSiteDb.prototype.testdata = function(){

    this.getServiceCollection(function(error, service_collection) {

        service_collection.remove();

        service_collection.save(
                                {type: 'service',
                                 name: 'service1',
                                 title: '',
                                 description: 'This is the first service we provide'
                                },
                                function(err, records){
                                  console.log("Added: "+records.name);
        });
        service_collection.save(
                                {type: 'service',
                                 name: 'service2',
                                 title: '',
                                 description: 'This is the second service we provide'
                                },
                                function(err, records){
                                  console.log("Added: "+records.name);
        });
        service_collection.save(
                                {type: 'service',
                                 name: 'service3',
                                 title: '',
                                 description: 'This is a third service we provide'
                                },
                                function(err, records){
                                  console.log("Added: "+records.name);
        });

      });
};

exports.VetSiteDb = VetSiteDb;