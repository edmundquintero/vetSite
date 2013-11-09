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

  VetSiteDb.prototype.addProduct = function(newProduct, callback){
    this.getProductsCollection(function(error, product_collection) {
      product_collection.save(newProduct, function(err, record){
        if(err){
          callback(error);
        }else{
          callback(null, record);
        }
      });
    });
  };

  VetSiteDb.prototype.updateProduct = function(id, newProduct, callback){
    this.getProductsCollection(function(error, product_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        product_collection.find().toArray(function(error, results) {
          if( error ){
            callback(error);
          }else{
            product_collection.update(results[0], newProduct, function(error, result){
              if(error){
                callback(error);
              }else{
                callback(null, results);
              }
            });

          }
        });
      }
    });
  };

  VetSiteDb.prototype.deleteProduct = function(id, callback){
    this.getProductsCollection(function(error, product_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        product_collection.remove({_id: ObjectID(id) }, function(error) {
          if( error ){
            callback(error);
          }else{
            callback(null);
          }
        });
      }
    });
  };
};

exports.ProductProvider = ProductProvider;