var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.bodyParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  // res.header('X-XSS-Protection', 0);
  next();
});

var routes = require('./routes');
routes(app);

app.listen(process.env.PORT);
console.log('Listening on port ' + process.env.PORT + '...');
