// Waits for document to load
$(document).ready(function(){
    $.ajax({
        url: "https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3",
        success: function(data) {
            console.log("data", data);
        },
        error: function(error) {
            console.log("error", error.responseJSON.message);
        }
    });
});