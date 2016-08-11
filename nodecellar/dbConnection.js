const config = require('./config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var exports = module.exports = {};

var url;
if (config.username && config.password) {
  url = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.name;
} else {
  url = 'mongodb://' + config.host + ':' + config.port + '/' + config.name;
}

var dbConnection = mongoose.connect(url);

autoIncrement.initialize(dbConnection);

exports.Schema = Schema;
exports.Connection = dbConnection;
exports.autoIncrement = autoIncrement;
