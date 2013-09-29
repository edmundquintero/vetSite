var ObjectID = require('mongodb').ObjectID;

ProductProvider = function(VetSiteDb){

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


};

exports.ProductProvider = ProductProvider;