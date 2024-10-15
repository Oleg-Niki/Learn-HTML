let cart = [];

function addToCart(productName) {
    cart.push(productName);
    alert(productName + " added to cart!");
    console.log(cart);
}

function filterProducts() {
    const size = document.getElementById('size-filter').value;
    const color = document.getElementById('color-filter').value;
    const crystal = document.getElementById('crystal-filter').value;

    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        let showProduct = true;

        if (size !== 'all' && product.dataset.size !== size) {
            showProduct = false;
        }
        if (color !== 'all' && product.dataset.color !== color) {
            showProduct = false;
        }
        if (crystal !== 'all' && product.dataset.crystal !== crystal) {
            showProduct = false;
        }

        if (showProduct) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
