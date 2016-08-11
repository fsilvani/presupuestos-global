// PRESUPUESTOS
var presupuestos = require('./routes/presupuestos');
var clientes = require('./routes/clientes');

module.exports.findAllBudgets = function(callback) {
  presupuestos.findAllBudgets(callback);
};

module.exports.findBudgetById = function(param, callback) {
  presupuestos.findBudgetById(param, callback);
};

module.exports.saveBudget = function(param, callback) {
  presupuestos.saveBudget(param, callback);
};

module.exports.removeBudget = function(param, callback) {
  presupuestos.removeBudget(param, callback);
};


// CLIENTES
var clientes = require('./routes/clientes');

module.exports.findAllClients = function(callback) {
  clientes.findAllClients(callback);
};

module.exports.findClientById = function(param, callback) {
  clientes.findClientById(param, callback);
};

module.exports.saveClient = function(param, callback) {
  clientes.saveClient(param, callback);
};

module.exports.updateClient = function(param, callback) {
  clientes.updateClient(param, callback);
};

module.exports.removeClient = function(param, callback) {
  clientes.removeClient(param, callback);
};


// PAGOS
var pagos = require('./routes/pagos');

module.exports.findAllPayments = function(callback) {
  pagos.findAllPayments(callback);
};

module.exports.findPaymentById = function(param, callback) {
  pagos.findPaymentById(param, callback);
};

module.exports.savePayment = function(param, callback) {
  pagos.savePayment(param, callback);
};

module.exports.removePayment = function(param, callback) {
  pagos.removePayment(param, callback);
};
