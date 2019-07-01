// Waits for document to load
$(document).ready(function(){
    $.ajax({
        url: "https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3",
        success: function(data) {
            console.log("data", data);
            // <div class="col-12 col-sm-6 col-md-3 p-0">
            //     <div class="product-card">
            //         <figure>
            //             <img class="img-fluid" src="./images/products/product-1.jpg">
            //         </figure>
            //         <span class="tag exclusive">Exclusive</span>
            //         <div class="product-info">
            //             <span class="name">Product name</span>
            //             <span class="price">$15.00</span>
            //         </div>
            //     </div>
            // </div>
        },
        error: function(error) {
            console.log("error", error.responseJSON.message);
        }
    });
});