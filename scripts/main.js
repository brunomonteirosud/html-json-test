// "Global" variable to hold loaded products and avoid unecessary AJAX calls
// In a real life project, this would probably not be a variable, but some kind of state management
let loadedProducts;

// Waits for document to load
$(document).ready(() => {
    $.ajax({
        url: "https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3",
        success: (data) => {
            // Clean Code principle: Single Level of Abstraction
            // This success function is only responsible for receiving the loaded data and passing it forward
            loadedProducts = data;
            appendProducts(data);
            createFilter(data);
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

            // Display error message on size filter
            $("#sizeFilter").html("<option>No options</option>");
        }
    });
});

const appendProducts = (products, filter="all") => {
    // Clear product display block
    $("#productsDisplay").html("");

    let filteredProducts = [];

    if (filter === "all") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter((product) => {
            return product.size.includes(filter.toUpperCase());
        });
    }

    // Process JSON data to format it in correct HTML template
    const productCards = filteredProducts.map(function(product){
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
    if (productCards.length == 0) {
        $("#productsDisplay").html(`
            <div class="alert alert-info w-100" role="alert">
                <p>No products matching current filter<p>
            </div>
        `);
    } else { 
        $("#productsDisplay").append(productCards);
    }
}

const createFilter = (data) => {
    // Get all size options in one flatten array
    const allSizeOptions = data.map((item) => {
        return item.size;
    }).flat();

    // Remove duplicated values and create filter options
    const sizeOptions = [...new Set(allSizeOptions)];
    const filterOptions = sizeOptions.map((option) => {
        return (`<option value="${option.toLowerCase()}">${option}</option>`);
    })

    $("#sizeFilter").html("<option value='' selected hidden>Filter by size</option>");
    $("#sizeFilter").append("<option value='all'>All</option>");
    $("#sizeFilter").append(filterOptions);
}

const filterBySize = (event) => {
    // Call append products with selected filter. This will rerender the page.
    appendProducts(loadedProducts, event.target.value)
}
