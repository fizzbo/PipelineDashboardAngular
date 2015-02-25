// Dependencies
var express = require('express'),
    http = require('http'),
    path = require('path');

// Set up the application
var app = express();

// Environment Checks
app.set('port', process.env.PORT || 1337);

// Manage Views
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, './dist/templates'));
app.set('view engine', 'html');

// Load Assets
app.use('/assets', express.static(path.join(__dirname, './dist/assets')));
app.use('/templates', express.static(path.join(__dirname, './dist/templates')));

if ('development' == app.get('env')) {
    app.use(require('connect-livereload')({
        port: 35729
    }));
}

app.get('*', function (req, res) {
    res.render('index');
});

// Start up the server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
