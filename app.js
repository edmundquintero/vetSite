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
  // res.render('index',{
  //     home:"active",
  //     sidebar: []
  //   });
  vetSiteDb.getAllProducts( function(error,docs){
    res.render('index',{
   		home:"active",
  		sidebar: docs
    });
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
app.get('/products', function(req, res) {
	vetSiteDb.getAllProducts( function(error,products){
   		res.render('products',{
   			products:"active",
				sidebar: products
				});
   	});
});
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