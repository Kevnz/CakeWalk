var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs'); 
	app.set("view options", {layout: true});
	app.register('.html', require('ejs'));
	app.use(express.methodOverride()); 
	app.use(express.bodyParser()); 
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

});

app.get('/', function(req, res){
	res.render('index.html');
});


app.listen(process.env.C9_PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
