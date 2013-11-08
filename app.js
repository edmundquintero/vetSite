var express = require('express');
var VetSiteDb = require('./static/js/mongo').VetSiteDb;
var ObjectID = require('mongodb').ObjectID;

var app = express();

// include handelbars for templating
var hbs = require('hbs');

// Set static folder
app.use(express.static('static'));

// Set rendering engine
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

// start DB
var vetSiteDb = new VetSiteDb('localhost', 27017);
vetSiteDb.addProviders();
//Load test data
vetSiteDb.testdata();

// Routing
app.get('/', function(req, res) {
  res.render('index',{
 		home:"active",
		sidebar:[
          { name:"food1", title:"" },
          { name:"food2", title:"" },
          { name:"food3", title:"" }]
  });
});
// Service Rout ----
app.get('/service/:id', function(req, res) {
  var contents = { services:"active" };
  vetSiteDb.getServiceList( function(error,services){
        contents.sidebar = services;
        vetSiteDb.getService(req.params.id, function(error,service){
          contents.returnItem = service;
          res.render('services', contents);
        });
  });
});
app.get('/service', function(req, res) {
  var contents = { services:"active" };
  vetSiteDb.getServiceList( function(error,services){
        contents.sidebar = services;
        vetSiteDb.getService(services[0]._id, function(error,service){
          contents.returnItem = service;
          res.render('services', contents);
        });
  });
});
// Product rout ----
app.get('/product/:id', function(req, res) {
  var contents = { products:"active" };
  vetSiteDb.getProductList( function(error,products){
        contents.sidebar = products;
        vetSiteDb.getProduct(req.params.id, function(error,product){
          contents.returnItem = product;
          res.render('products', contents);
        });
  });
});
app.get('/product', function(req, res) {
  var contents = { products:"active" };
	vetSiteDb.getProductList( function(error,products){
				contents.sidebar = products;
        vetSiteDb.getProduct(products[0]._id, function(error,product){
          contents.returnItem = product;
          res.render('products', contents);
        });
	});
});
app.post('/product', function(req, res) {
  var product = {
                type: 'product',
                name: req.body.name,
                title: '',
                description: req.body.description
                };
  vetSiteDb.getProductsCollection(function(error, product_collection) {
    product_collection.save(product, function(err, records){
                              if(err){
                                res.send(404);
                              }else{
                                console.log("Added: "+records.name+" : "+records._id );
                                res.redirect('/admin');
                              }
                            });
  });
});
app.delete('/product/:id', function (req, res) {
  vetSiteDb.deleteProduct(req.param('id'), function(error, object){
    res.send(200);
  });
});


// ---------------------------

app.get('/whoweare', function(req, res) {
   res.render('whoweare',{
   				whoweare:"active",
					sidebar:[
						{ name:"profile1", title:"profile1" },
						{ name:"profile2", title:"profile2" },
						{ name:"profile3", title:"profile3" }]
					});
});
app.get('/contact', function(req, res) {
   res.render('contact',{
  				contact:"active",
					sidebar:[
						{ name:"info1", title:"info1" },
						{ name:"info2", title:"info2" },
						{ name:"info3", title:"info3" }]
					});
});
app.get('/admin', function(req, res) {
  var contents = { admin:"active" };
   vetSiteDb.getProductList( function(error,products){
        contents.items = products;
        res.render('admin', contents);
  });
});

// Start Server
app.listen(3001);