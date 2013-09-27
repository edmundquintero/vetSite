var express = require('express');
var VetSiteDb = require('./static/js/mongo').VetSiteDb;

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

app.get('/services', function(req, res) {
   res.render('services',{
   				services:"active",
					sidebar:[
						{ name:"service1", title:"service1" },
						{ name:"service2", title:"service2" },
						{ name:"service3", title:"service3" }]
					});
});
// ------------------------------------
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

// Start Server
app.listen(3001);