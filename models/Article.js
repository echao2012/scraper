var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create a new UserSchema object
var ArticleSchema = new Schema({
    // Title of the article
    title: {
        type: String,
        required: true,
        unique: true
    },

    // Link to the article
    link: {
        type: String,
        required: true,
        unique: true
    },

    // Boolean indicating if the article is saved
    saved: {
        type: Boolean,
        default: false
    },

    // Notes for the article
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

// Create our model from the above schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;