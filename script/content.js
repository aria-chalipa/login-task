document.addEventListener('DOMContentLoaded', () => {

    fetch('https://fakestoreapi.com/products')
        .then(res => {
            console.log( res);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(products => {
            console.log( products);
            displayProducts(products);
        })
        .catch(error => {
            console.error(error);
            document.getElementById('productContainer').innerHTML = `
                <div class="error-message">
                    Error loading products. Please try again later.<br>
                    <small>${error.message}</small>
                </div>
            `;
        });
});

function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; 
    
    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description.substring(0, 100)}...</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        `;
        container.innerHTML += productCard;
    });
}