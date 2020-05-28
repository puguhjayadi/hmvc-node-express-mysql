const customers = require("../controllers/customer.controller.js");

module.exports = app => {
    app.get("/customers", customers.getAll);
    app.post("/customers", customers.store);
    app.get("/customers/:customerId", customers.show);
    app.put("/customers/:customerId", customers.update);
    app.delete("/customers/:customerId", customers.destroy);
};