const Customer  = require("../models/customer.model.js");
const coreModel = require("../../../core/core.model.js")(Customer.table);
const modules   = 'customers';

// http://localhost:3000/customers?search=ayu&page=3&per_page=3
exports.getAll = (req, res) => {

  req.column = ["name", "email", "active"];

  coreModel.paginate(req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.store = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // can custom object
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  coreModel.store(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.show = (req, res) => {
  coreModel.show(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  coreModel.update(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
    );
};

exports.destroy = (req, res) => {
  coreModel.destroy(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.view = (req, res) => {
  res.render('index');
};