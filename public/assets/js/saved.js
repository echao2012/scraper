$(document).ready(function() {
    var currentArticleId;

    // Handles the "Delete" button click
    $(document).on("click", ".btn.delete-article", function() {
        // Get the data from the card containing the button that was clicked
        var article = $(this).parents(".card").data();
        
        // Remove the card
        $(this).parents(".card").remove();

        // Send request to delete the article
        $.ajax({
            method: "DELETE",
            url: "/api/articles/" + article._id
        });
    });

    // Handles the "Article Notes" button click
    $(document).on("click", ".btn.article-notes", function() {
        // Get the data from the card containing the button that was clicked
        var article = $(this).parents(".card").data();
        currentArticleId = article._id;
        
        // Get info about the article from database
        $.get("/api/articles/" + article._id).then(function(articleData) {
            // Update the modal title
            $("#notes-modal-title").text("Notes For Article: " + articleData.title);

            // Display the saved notes
            $(".notes-list").empty();
            $("#notes-textarea").val("");
            articleData.notes.forEach(function(note) {
                // Create list item with note text
                var newLi = $("<li>");
                newLi.addClass("list-group-item");
                newLi.text(note);

                // Create delete button for the note
                var newBtn = $("<button>");
                newBtn.addClass("btn btn-danger delete-note");
                newBtn.text("x");

                newLi.append(newBtn);
                $(".notes-list").append(newLi);
            });
        });
    });

    $(document).on("click", ".btn.delete-note", function() {
        // Get the note text
        var noteText = $(this).parents(".list-group-item").contents().not($(".list-group-item").children()).text();

        // Remove the note from the modal list
        $(this).parents(".list-group-item").remove();

        // Send delete request to remove the note
        $.ajax({
            method: "DELETE",
            url: "/api/notes/" + currentArticleId,
            data: { text: noteText }
        });
    });

    // Handles the "Save Note" button click
    $(".btn.save-note").on("click", function() {
        $("#notes-modal").modal("hide");

        $.ajax({
            method: "POST",
            url: "/api/notes/" + currentArticleId,
            data: { text: $("#notes-textarea").val() }
        });
    });

    // Handles the "Delete All" button click
    $(".btn.delete-all-articles").on("click", function(){
        $.get("/api/clear?saved=true").then(function() {
            window.location.reload(false);
        })
    });
});