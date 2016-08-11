var config = require('../config');
var mongoose = require('mongoose');
var dbConnection = require('../dbConnection');
var clientes = require('./clientes');

// create a schema
var presupuestosSchema = new dbConnection.Schema({
  "_budgetId": Number,
  "billNumber": String,
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
  "budgetTotal": Number,
  "client": {type: dbConnection.Schema.Types.ObjectId, ref: 'clientes'}
});

presupuestosSchema.plugin(dbConnection.autoIncrement.plugin, {model: 'presupuestos', field: '_budgetId'});

// the schema is useless so far
// we need to create a model using it
var presupuestos = dbConnection.Connection.model('presupuestos', presupuestosSchema);

dbConnection.Connection.connection;

presupuestos.update({}, {$set: {'budgetStatus': 'pendiente'}}, function(err, result){
  console.log('listo el pollo!', result);
});

module.exports.findAllBudgets = function(callback) {
  console.log('Listing all budgets');
  presupuestos.find(null, {
    "_budgetId": 1,
    "billNumber": 1,
    "budgetDate": 1,
    "budgetTotal": 1,
    "client": 1
  }).populate('client').exec(function(err, result){
    if (err) throw err;
    callback(result);
  });
};

module.exports.findBudgetById = function(param, callback) {
  console.log('List Budget with id:' + param);
  presupuestos.findOne({_budgetId: param}, {
    'client._id': 0,
    'client.clientBalance': 0,
    'client.clientAdress': 0,
    'client.clientTelephone': 0,
    'client.clientNotes': 0,
    'client.clientBudgets': 0,
    'client.clientPayments': 0
  }).populate('client').exec(function(err, result){
      if (err) throw err;
      callback(result);
    });
};

module.exports.saveBudget = function(param, callback) {
  console.log('Save new budget', param);
  clientes.clientes.findOne({_id: param.client}, function(err, result){
    var deudaActual = result.clientBalance;
    var deudaActualizada = deudaActual - param.budgetTotal;
    var newBudget = new presupuestos(param);
    newBudget.save(function(err, result) {
      if (err) throw err;
      clientes.clientes.update({_id: param.client}, {$push: {clientBudgets: result._id}, clientBalance: deudaActualizada}, function(error, clientResult){
        if (error) throw error;
        console.log('cliente actualizado correctamente');
      });
      callback(result);
    });
  });
};

module.exports.removeBudget = function(param, callback) {
  console.log('Remove budget');
  presupuestos.remove({_budgetId: param}, function(err, result) {
    if (err) throw err;
    callback(result);
  });
};

module.exports.presupuestos = presupuestos;

// dbConnection.Connection.connection.close();
