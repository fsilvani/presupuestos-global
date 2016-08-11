var config = require('../config');
var mongoose = require('mongoose');
var dbConnection = require('../dbConnection');
var clientes = require('./clientes');

// create a schema
var pagosSchema = new dbConnection.Schema({
  "_paymentId": Number,
  "paymentMount": Number,
  "client": {type: dbConnection.Schema.Types.ObjectId, ref: 'clientes'},
  "paymentDate": Date,
  "paymentMethod": String,
  "paymentNotes": String
});

pagosSchema.plugin(dbConnection.autoIncrement.plugin, {model: 'pagos', field: '_paymentId'});

// the schema is useless so far
// we need to create a model using it
var pagos = dbConnection.Connection.model('pagos', pagosSchema);

dbConnection.Connection.connection;

module.exports.findAllPayments = function(callback) {
  console.log('Listing all payments');
  pagos.find({}).populate('paymentClient').exec(function(err, result){
    if (err) throw err;
    callback(result);
  });
};

module.exports.findPaymentById = function(param, callback) {
  console.log('List Payment with id:' + param);
  pagos.findOne({_paymentId: param}).populate('paymentClient').exec(function(err, result){
      if (err) throw err;
      callback(result);
    });
};

module.exports.savePayment = function(param, callback) {
  console.log('Save new payment', param);
  clientes.clientes.findOne({_id: param.client}, function(err, result){
    var deudaActual = result.clientBalance;
    var deudaActualizada = deudaActual + param.paymentMount;
    var newPayment = new pagos(param);
    newPayment.save(function(err, result) {
      if (err) throw err;
      clientes.clientes.update({_id: param.client}, {$push: {clientPayments: result._id}, clientBalance: deudaActualizada}, function(error, clientResult){
        if (error) throw error;
        console.log('cliente actualizado correctamente');
        callback(result);
      });
    });
  });
};

module.exports.removePayment = function(param, callback) {
  console.log('Remove payment');
  pagos.remove({_budgetId: param}, function(err, result) {
    if (err) throw err;
    callback(result);
  });
};

module.exports.pagos = pagos;

// dbConnection.Connection.connection.close();
