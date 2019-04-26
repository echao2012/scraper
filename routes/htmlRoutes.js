// Dependencies


// Require all models
var db = require("../models");

module.exports = function(app) {
    // Route to home page
    app.get("/", function(req, res) {
        // Find all saved articles
        db.Article.find({
            saved: false
        })
        .then(function(dbArticle) {
            res.render("index", {
                articles: dbArticle
            });
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route to saved articles page
    app.get("/saved", function(req, res) {

    });

    // Redirect any unhandled route to home page
    app.get("*", function(req, res) {
        res.redirect("/");
    });
}