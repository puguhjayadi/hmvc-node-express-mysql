const coreModel = require("../core/core.model.js")('customers');

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.getAll  = function (result) {
  coreModel.getAll(function(err, res){
    if( err ) result(null, err);
    result(null, res);
  });
};

Customer.findById  = function (id, result) {
  coreModel.findById(id, function(err, res){
    if( err ) result(null, err);
    result(null, res);
  });
};

Customer.create  = function (customer, result) {
  coreModel.create(customer, function(err, res){
    if( err ) result(null, err);
    result(null, res);
  });
};

Customer.updateById  = function (id, customer, result) {
  coreModel.updateById(id, customer, function(err, res){
    if( err ) result(null, err);
    result(null, res);
  });
};

Customer.remove  = function (id, result) {
  coreModel.remove(id, function(err, res){
    if( err ) result(null, err);
    result(null, res);
  });
};



module.exports = Customer;