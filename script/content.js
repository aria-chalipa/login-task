 let loading = true
document.addEventListener('DOMContentLoaded', () => {
   
    displayLoading()
   setInterval(() => fetch('https://fakestoreapi.com/products')
        .then(res => {
            loading = false
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
        }),3000)
});

function displayLoading(){
    if(loading){
        const container = document.getElementById('productContainer');
        container.innerHTML =''
        const loadingShow = `
         <div class="loader">
                <div class="loading-text">Loading...</div>
            </div>

            <div class="text">
                <h3>
                    loading...
                </h3>
        </div>`
        container.innerHTML += loadingShow       
    }
}

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