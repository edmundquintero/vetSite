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
 		home:"active"
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
//Retrieve single
app.get('/product/:id', function(req, res) {
  var contents = { products:"active" };
  vetSiteDb.getProductList( function(error,products){
        contents.sidebar = products;
        contents.sideName = "Products";
        contents.sideDescription = "Products available in the store.";
        vetSiteDb.getProduct(req.params.id, function(error,product){
          contents.returnItem = product;
          res.render('products', contents);
        });
  });
});
//Retrieve single API
app.get('/api/product/:id', function(req, res) {
  var contents = { products:"active" };
  vetSiteDb.getProductList( function(error,products){
        vetSiteDb.getProduct(req.params.id, function(error,product){
          res.send(product);
        });
  });
});
// Retrieve List
app.get('/product', function(req, res) {
  var contents = { products:"active" };
	vetSiteDb.getProductList( function(error,products){
				contents.sidebar = products;
        contents.sideName = "Products";
        contents.sideDescription = "Products available in the store.";
        vetSiteDb.getProduct(products[0]._id, function(error,product){
          contents.returnItem = product;
          res.render('products', contents);
        });
	});
});
// Update
app.post('/product/:id', function(req, res) {
  var product = {};
  if(req.body.name){
    product.name = req.body.name;
  }
  if(req.body.description){
    product.description = req.body.description;
  }
  product.type = 'product';
  vetSiteDb.updateProduct(req.param('id'), product, function(error) {
    if(error){
      res.send(500);
    }else{
      res.redirect('/admin');
    }
  });
});
// Create
app.post('/product', function(req, res) {
  var product = {};
  if(req.body.name){
    product.name = req.body.name;
  }
  if(req.body.description){
    product.description = req.body.description;
  }
  product.type = 'product';
  vetSiteDb.addProduct(product, function(error, record) {
    if(error){
      res.send(500);
    }else{
      console.log("Added: "+record.name+" : "+record._id );
      res.redirect('/admin');
    }
  });
});
//Delete
app.delete('/product/:id', function (req, res) {
  vetSiteDb.deleteProduct(req.param('id'), function(error, object){
    res.send({ 'id': req.param('id')});
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
  res.redirect('/admin/products');
});

app.get('/admin/:type', function(req, res) {
  var type = req.param('type');
  switch(type){
    case 'services':
      var contents = { admin:"active",
                       servicesTab: "active"
                     };
        vetSiteDb.getServiceList( function(error,services){
          contents.items = services;
          res.render('admin', contents);
        });
      break;
    default:
      var contents = { admin:"active",
                       productsTab: "active"
                     };
        vetSiteDb.getProductList( function(error,products){
          contents.items = products;
          res.render('admin', contents);
        });
  }
});

// Start Server
app.listen(3001);