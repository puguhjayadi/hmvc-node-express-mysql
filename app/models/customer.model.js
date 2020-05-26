
const table = "customers";

const constructor = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

module.exports = {constructor, table};