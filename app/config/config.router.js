
module.exports = app => {
    
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to application." });
      });

    require("../modules/customers/routers/customer.routes.js")(app);
};