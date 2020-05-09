
module.exports = app => {
    
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to application." });
      });

    require("./customer.routes.js")(app);
};