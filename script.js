document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let lastAddedTime = null;

    // Update cart quantity and save cart to the server
    function updateCartQuantity() {
        const cartQuantityElement = document.getElementById('cart-quantity');
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartQuantityElement.textContent = totalQuantity;

        // שמירת העגלה בשרת
        fetch('save_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status !== 'success') {
                console.error('Error saving cart:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    updateCartQuantity();

    // Fetch inventory data and update based on all carts
    fetch('inventory.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // Fetch all carts from the server to calculate total stock
            fetch('get_all_carts.php') // קובץ זה יחזיר את כל העגלות
                .then(response => response.json())
                .then(cartsData => {
                    products.forEach(product => {
                        let totalInCarts = 0;

                        // לחשב כמה מהמוצרים בעגלות
                        cartsData.forEach(cart => {
                            const itemInCart = cart.find(item => item.id === product.id);
                            if (itemInCart) {
                                totalInCarts += itemInCart.quantity;
                            }
                        });

                        // לעדכן את המלאי בהתאם לכמות הכוללת בעגלות
                        const stockAvailable = product.stock - totalInCarts;
                        const stockButton = document.querySelector(`.stock-button[data-product-id="${product.id}"]`);
                        if (stockButton) {
                            stockButton.textContent = `כמות במלאי: ${stockAvailable}`;

                            // Update button color based on stock
                            if (stockAvailable > 1) {
                                stockButton.style.backgroundColor = 'green';
                                stockButton.style.color = 'white';
                            } else if (stockAvailable === 1) {
                                stockButton.style.backgroundColor = 'red';
                                stockButton.style.color = 'black';
                            } else {
                                stockButton.style.backgroundColor = 'grey';
                                stockButton.style.color = 'white';
                                stockButton.disabled = true;
                                const addToCartButton = document.querySelector(`.add-to-cart[data-product-id="${product.id}"]`);
                                if (addToCartButton) {
                                    addToCartButton.style.display = 'none';
                                }
                            }
                        }
                    });
                });
        })
        .catch(error => console.error('Error loading inventory:', error));
});
