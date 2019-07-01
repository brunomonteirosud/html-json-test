// Waits for document to load
$(document).ready(() => {
    $.ajax({
        url: "https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3",
        success: (data) => {
            appendProducts(data);
            // createFilter(data);
        },
        error: (error) => {
            // Displays error message if data was not loaded
            $("#productsDisplay").html(`
                <div class="alert alert-danger w-100" role="alert">
                    <p>
                        <span>Could not load data from server. Please check your connection and try again.</span>
                        <br>
                        <span>Error Message: <strong>${error.responseJSON.message || "No message"}</strong></span>
                    </p>
                </div>
            `);
        }
    });
});

const appendProducts = (products) => {
    // Clear product display block
    $("#productsDisplay").html("");

    // Process JSON data to format it in correct HTML template
    var productCards = products.map(function(product){
        return(`
            <div class="col-12 col-md-6 col-lg-3 p-0">
                <div class="product-card">
                    <figure>
                        <img class="img-fluid" src="./images/products/${product.productImage}">
                    </figure>
                    <div class="tag">
                        ${product.isSale ? '<span class="sale">Sale</span>' : ''}
                        ${product.isExclusive ? '<span class="exclusive">Exclusive</span>' : ''}
                    </div>
                    <div class="product-info">
                        <span class="name">${product.productName}</span>
                        <span class="price">${product.price}</span>
                    </div>
                </div>
            </div>
        `);
    });

    // Append formatted HTML
    $("#productsDisplay").append(productCards);
}

const createFilter = (products) => {
}
