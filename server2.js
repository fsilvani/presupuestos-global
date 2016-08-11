var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bodyParser = require('body-parser');

// Conexión con la base de datos
var connection = mongoose.connect('mongodb://localhost:27017/presupuestos');

// var connection = mongoose.createConnection('mongodb://localhost:27017/presupuestos');

// Configuración
app.configure(function() {
  // Localización de los ficheros estáticos
  app.use(express.static(__dirname + '/public'));
  // Muestra un log de todos los request en la consola
  app.use(express.logger('dev'));
  // Permite cambiar el HTML con el método POST
  app.use(express.bodyParser());
  // Simula DELETE y PUT
  app.use(express.methodOverride());
});

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

// Definición de modelos
// var Presupuestos = mongoose.model('presupuestos', {
var PresupuestosSchema = new Schema({
  "budgetId": Number,
  "billNumber": String,
  "clientId": Number,
  "budgetDate": Date,
  "budgetNotes": String,
  "budgetItems": [
    {
      "itemCount": Number,
      "itemCode": String,
      "itemDescription": String,
      "unitPrice": Number,
      "totalPrice": Number
    }
  ],
  "budgetSubtotal": Number,
  "budgetDiscount": Number,
  "budgetIva": Number,
  "budgetTotal": Number
});

var Presupuestos = connection.model('presupuestos', PresupuestosSchema);

// Rutas de nuestro API
// GET de todos los Presupuestos
app.get('/api/presupuestos/get', function(req, res) {
  Presupuestos.find(function(err, presupuestos) {
    if (err) res.send(err);
    res.json(presupuestos);
  });
});
// GET de Presupuesto por presupuestoId
app.get('/api/presupuestos/get/:budgetId', function(req, res) {
  Presupuestos.findOne({budgetId: req.params.budgetId}, function(err, presupuestos) {
    if (err) res.send(err);
    res.json(presupuestos);
  });
});
// POST de nuevo Presupuesto
app.post('/api/presupuestos/post', function(req, res) {
  Presupuestos.create(req.body, function(err, presupuesto) {
    if (err) res.send(err);
    res.json(presupuesto);
  });
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {
  res.send('respond with a resource');
});

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
  console.log('App listening on port 8080');
});
