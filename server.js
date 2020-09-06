const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const url = require('url');

const app = express();
const hbs = require('hbs');


app.set('views',path.join(__dirname,'app/modules/customers/views'));
//set view engine
app.set('view engine', 'hbs');
//set public folder as static folder for static file
app.use(express.static('assets'));
hbs.registerPartials(path.join(__dirname, "app/views/partials"));
hbs.registerPartials(path.dirname(require.main.filename) + '/app/views');

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/config/config.router.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

