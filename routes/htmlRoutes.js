// Dependencies


// Require all models
var db = require("../models");

module.exports = function(app) {
    // Route to home page
    app.get("/", function(req, res) {

    });

    // Route to saved articles page
    app.get("/saved", function(req, res) {

    });

    // Redirect any unhandled route to home page
    app.get("*", function(req, res) {
        res.redirect("/");
    });
}