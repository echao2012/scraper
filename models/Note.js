var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create a new UserSchema object
var NoteSchema = new Schema({
    // Note text
    text: String
});

// Create our model from the above schema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;