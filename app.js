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

// Add session to requests
app.use( express.cookieParser() );
app.use(express.session({secret: '00780ndJ@m3s80nd'}));

// Routing
app.get('/', function(req, res) {
  res.render('index',{
 		home:"active",
    session: req.session
  });
});
// Service Rout ----
// retrieve single
app.get('/service/:id', function(req, res) {
  var contents = { services:"active",
                    session: req.session
   };
  vetSiteDb.getServiceList( function(error,services){
        contents.sidebar = services;
        vetSiteDb.getService(req.params.id, function(error,service){
          contents.returnItem = service;
          res.render('services', contents);
        });
  });
});
// Retrieve single API
app.get('/api/service/:id', function(req, res) {
  var contents = { service:"active" };
  vetSiteDb.getServiceList( function(error,services){
        vetSiteDb.getService(req.params.id, function(error,service){
          res.send(service);
        });
  });
});
// Retrieve list
app.get('/service', function(req, res) {
  var contents = { services:"active",
                  session: req.session
   };
  vetSiteDb.getServiceList( function(error,services){
        contents.sidebar = services;
        vetSiteDb.getService(services[0]._id, function(error,service){
          contents.returnItem = service;
          res.render('services', contents);
        });
  });
});
// Create
app.post('/service', function(req, res) {
  var service = {};
  if(req.body.name){
    service.name = req.body.name;
  }
  if(req.body.description){
    service.description = req.body.description;
  }
  service.type = 'service';
  vetSiteDb.addService(service, function(error, record) {
    if(error){
      res.send(500);
    }else{
      console.log("Added: "+record.name+" : "+record._id );
      res.redirect('/admin/services');
    }
  });
});
// Update
app.post('/service/:id', function(req, res) {
  var service = {};
  if(req.body.name){
    service.name = req.body.name;
  }
  if(req.body.description){
    service.description = req.body.description;
  }
  service.type = 'service';
  vetSiteDb.updateService(req.param('id'), service, function(error) {
    if(error){
      res.send(500);
    }else{
      res.redirect('/admin/services');
    }
  });
});
//Delete
app.delete('/service/:id', function (req, res) {
  vetSiteDb.deleteService(req.param('id'), function(error, object){
    res.send({ 'id': req.param('id')});
  });
});

// Product rout ----
//Retrieve single
app.get('/product/:id', function(req, res) {
  var contents = { products:"active",
                   session: req.session,
  };
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
  var contents = { products:"active",
                   session: req.session
  };
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
      res.redirect('/admin/products');
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
          session: req.session,
					sidebar:[
						{ name:"profile1", title:"profile1" },
						{ name:"profile2", title:"profile2" },
						{ name:"profile3", title:"profile3" }]
					});
});
app.get('/contact', function(req, res) {
   res.render('contact',{
  				contact:"active",
          session: req.session,
					sidebar:[
						{ name:"info1", title:"info1" },
						{ name:"info2", title:"info2" },
						{ name:"info3", title:"info3" }]
					});
});

// Login/Logout routs
app.get('/login', function(req, res) {
  var errors = {};
  if(req.session.username && req.session.password ){
    if(req.session.username =='admin' && req.session.password == 'admin'){
      res.redirect('/admin');
    } else{
    errors={msg:'This account does not have permission to edit this page!'}
    }
  }
  res.render('login', errors);
});
app.post('/login', function(req, res) {
  var errors = {};
  if(req.param('username') == 'admin' && req.param('password') == 'admin'){
    req.session.username = req.param('username');
    req.session.password = req.param('password');
    res.redirect('/admin');
  }else{
    errors={msg:'Username/Password did not match!'}
  }
  res.render('login', errors);
});
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

// Admin routs
app.get('/admin', function(req, res) {
  res.redirect('/admin/products');
});

app.get('/admin/:type', function(req, res) {
  var contents = {admin:"active",
                  session: req.session
  };
  var type = req.param('type');
  switch(type){
    case 'services':
      contents.servicesTab = "active";
      vetSiteDb.getServiceList( function(error,services){
        contents.items = services;
        res.render('admin', contents);
      });
      break;
    default:
      contents.productsTab = "active";
      vetSiteDb.getProductList( function(error,products){
        contents.items = products;
        res.render('admin', contents);
      });
  }
});

// Start Server
app.listen(3001);