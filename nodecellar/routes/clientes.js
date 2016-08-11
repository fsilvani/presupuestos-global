var config = require('../config');
var mongoose = require('mongoose');
var dbConnection = require('../dbConnection');
var presupuestos = require('./presupuestos');
var pagos = require('./pagos');

// create a schema
var clientesSchema = new dbConnection.Schema({
  "_clientId": Number,
  "clientName": String,
  "clientBalance": Number,
  "clientAdress": String,
  "clientTelephone": String,
  "clientNotes": String,
  "clientBudgets": [{ type: dbConnection.Schema.Types.ObjectId, ref: 'presupuestos' }],
  "clientPayments": [{ type: dbConnection.Schema.Types.ObjectId, ref: 'pagos' }]
});

clientesSchema.plugin(dbConnection.autoIncrement.plugin, {model: 'clientes', field: '_clientId'});

// the schema is useless so far
// we need to create a model using it
const clientes = dbConnection.Connection.model('clientes', clientesSchema);

dbConnection.Connection.connection;

module.exports.findAllClients = function(callback) {
  console.log('Listing all clients');
  clientes.find(null, {
    "_id": 1,
    "_clientId": 1,
    "clientName": 1,
    "clientBalance": 1,
    "clientAdress": 1,
    "clientTelephone": 1
  }, function(err, result){
    if (err) throw err;
    callback(result);
  });
};

module.exports.findClientById = function(param, callback) {
  console.log('List client with id:' + param);
  clientes.findOne({_clientId: param}).populate('clientBudgets').populate('clientPayments').exec(function(err, result){
    if (err) throw err;
    callback(result);
  });
};

module.exports.saveClient = function(param, callback) {
  console.log('Save new client');
  var newClient = new clientes(param);
  newClient.save(function(err) {
    if (err) throw err;
    callback(param);
  });
};

module.exports.updateClient = function(param, callback) {
  console.log('Update client');
  clientes.update({_id: param._id}, {$set: {
    clientName: param.clientName,
    clientAdress: param.clientAdress,
    clientTelephone: param.clientTelephone,
    clientNotes: param.clientNotes
  }}, function(err) {
    if (err) throw err;
    callback(param);
  });
};

module.exports.removeClient = function(param, callback) {
  console.log('Remove client');
  clientes.remove({_clientId: param}, function(err, result) {
    if (err) throw err;
    callback(result);
  });
};

module.exports.clientes = clientes;
