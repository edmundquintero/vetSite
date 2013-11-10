var ObjectID = require('mongodb').ObjectID;

ServiceProvider = function(VetSiteDb){

  VetSiteDb.prototype.getServiceCollection = function(callback){
    this.db.collection('services', function(error, service_collection) {
      if( error ) {
        callback(error);
      }else{
       callback(null, service_collection);
     }
    });
  };

  VetSiteDb.prototype.getServiceList = function(callback){
    this.getServiceCollection(function(error, service_collection) {
      if( error ){
        callback(error);
      }else{
        service_collection.find().toArray(function(error, results) {
          if( error ){
            callback(error);
          }else{
            callback(null, results);
          }
        });
      }
    });
  };

  VetSiteDb.prototype.getService = function(id, callback){
    this.getServiceCollection(function(error, service_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        service_collection.find({_id: ObjectID(id) }).toArray(function(error, results) {
          if( error ){
            callback(error);
          }else{
            callback(null, results[0]);
          }
        });
      }
    });
  };

  VetSiteDb.prototype.addService = function(newService, callback){
    this.getServiceCollection(function(error, service_collection) {
      service_collection.save(newService, function(err, record){
        if(err){
          callback(error);
        }else{
          callback(null, record);
        }
      });
    });
  };

  VetSiteDb.prototype.updateService = function(id, newService, callback){
    this.getServiceCollection(function(error, service_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        service_collection.find({_id: ObjectID(id) }).toArray(function(error, results) {
          if( error ){
            callback(error);
          }else{
            service_collection.update(results[0], newService, function(error, result){
              if(error){
                callback(error);
              }else{
                callback(null, result);
              }
            });
          }
        });
      }
    });
  };

  VetSiteDb.prototype.deleteService = function(id, callback){
    this.getServiceCollection(function(error, service_collection) {
      if( error ){
        callback(error);
      }else{
        if( typeof id != 'string'){id = id.toString();} //ObjectID only takes string as an argument
        service_collection.remove({_id: ObjectID(id) }, function(error) {
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

exports.ServiceProvider = ServiceProvider;