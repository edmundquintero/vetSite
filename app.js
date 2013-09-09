var express = require('express');
var app = express();

// include handelbars for templating
var hbs = require('hbs');

// Set static folder
app.use(express.static('static'));

// Set rendering engine
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());


// Routing
app.get('/', function(req, res) {
   res.render('index');
});



// Start Server
app.listen(3000);