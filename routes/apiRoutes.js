// Dependencies
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function(app) {
    // Route for scraping new articles
    app.get("/api/scrape", function(req, res) {
        // Scrape the Ars Technica website
        axios.get("https://arstechnica.com/").then(function(response) {
            // Load response data into cheerio
            var $ = cheerio.load(response.data);

            // Find each list item with an article class
            $("li.article").each(function(i, element) {
                var imgUrl = $(this).children("figure").children("div.listing").attr("style")
                imgUrl = imgUrl.substring(22, imgUrl.lastIndexOf("-"))
                    + imgUrl.substring(imgUrl.lastIndexOf("."), imgUrl.length - 3);


                var result = {
                    title: $(this).children("header").children("h2").children("a").text(),
                    subtitle: $(this).children("header").children("p.excerpt").text(),
                    link: $(this).children("header").children("h2").children("a").attr("href"),
                    imgUrl: imgUrl
                };

                // Create a new article entry in the database
                db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
            });

            // Scrape complete
        });
    });

    // Route to get all articles, saved articles, or unsaved articles
    app.get("/api/articles", function(req, res) {
        // Check if the query string has a "?saved=" parameter
        var query = {};
        if(req.query.saved) {
            query = { saved: req.query.saved }
        }

        // Find all articles
        db.Article.find(query)
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route to get an article and its notes by id
    app.get("/api/articles/:articleId", function (req, res) {
        db.Article.findOne({
            _id: req.params.articleId
        })
        .populate("notes")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route to save article by id
    app.put("/api/articles/:articleId", function(req,res) {
        db.Article.update({
            _id: req.params.articleId
        }, {
            $set: { saved: true }
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route to delete article by id
    app.delete("/api/articles/:articleId", function(req, res) {
        db.Article.remove({
            _id: req.params.articleId
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route to clear all articles, saved articles, or unsaved articles
    app.get("/api/clear", function(req, res) {
        // Check if the query string has a "?saved=" parameter
        var query = {};
        if(req.query.saved) {
            query = { saved: req.query.saved }
        }

        // Remove all articles
        db.Article.remove(query)
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route to create a note for an article id
    app.post("/api/notes/:articleId", function(req, res) {
        db.Article.findOneAndUpdate({
            _id: req.params.articleId
        }, {
            $push: { notes: req.body.text }
        }, {
            new: true
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route to delete a note by id
    app.delete("/api/notes/:articleId", function(req, res) {
        db.Article.update({
            _id: req.params.articleId
        }, {
            $pull: { notes: req.body.text }
        }, {
            new: true
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
}