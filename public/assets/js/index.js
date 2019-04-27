$(document).ready(function() {
    // Handles the "Save Article" button click
    $(document).on("click", ".btn.save-article", function() {
        // Get the data from the card containing the button that was clicked
        var article = $(this).parents(".card").data();
        
        // Remove the card
        $(this).parents(".card").remove();

        $.ajax({
            method: "PUT",
            url: "/api/articles/" + article._id,
            data: { saved: true }
        })
        .then(function(data) {
            if(data.saved) {
                console.log("SAVED!");
            }
        });
    });

    // Handles the "Scrape New Articles" button click
    $(".btn.scrape").on("click", function(){
        $.get("/api/scrape").then(function() {
            window.location.reload(false);
        });
    });

    // Handles the "Clear All Articles" button click
    $(".btn.clear-all-articles").on("click", function(){
        $.get("/api/clear?saved=false").then(function() {
            window.location.reload(false);
        })
    });
});