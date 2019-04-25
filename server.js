// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Initialize Express and configure middleware
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Include the routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Use the deployed port, otherwise use 8080. Start the server
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
    console.log("Server listening on: https://localhost:" + PORT);
});