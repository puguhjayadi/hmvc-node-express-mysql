
module.exports = app => {


	app.get("/", (req, res) => {
		  res.render('layout', {
			contents : "asd",
		});
	});

	require("../modules/customers/routers/customer.routes.js")(app);
};