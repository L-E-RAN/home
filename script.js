document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let lastAddedTime = null;

    // Toast Notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade');
        }, 3000); // Show for 3 seconds
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3500);
    }

    // Update cart quantity indicator
    function updateCartQuantity() {
        const cartQuantityElement = document.getElementById('cart-quantity');
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartQuantityElement.textContent = totalQuantity;
    }

    updateCartQuantity();

    fetch('inventory.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // Update stock buttons
            document.querySelectorAll('.stock-button').forEach(button => {
                const productId = button.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                if (product) {
                    button.textContent = `כמות במלאי: ${product.stock}`;
                    if (product.stock === 0) {
                        button.disabled = true;
                        button.style.backgroundColor = 'grey';
                    }
                }
            });

            // Add to cart functionality
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-product-id');
                    const product = products.find(p => p.id === productId);

                    if (product && product.stock > 0) {
                        const existingProduct = cart.find(item => item.name === product.name);
                        if (existingProduct) {
                            existingProduct.quantity += 1;
                        } else {
                            cart.push({
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1
                            });
                        }

                        product.stock -= 1;
                        sessionStorage.setItem('cart', JSON.stringify(cart));
                        lastAddedTime = Date.now();

                        showToast(`${product.name} נוסף לסל הקניות.`); // Show toast

                        // Update stock button
                        const stockButton = document.querySelector(`.stock-button[data-product-id="${productId}"]`);
                        if (stockButton) {
                            stockButton.textContent = `כמות במלאי: ${product.stock}`;
                            if (product.stock === 0) {
                                stockButton.disabled = true;
                                stockButton.style.backgroundColor = 'grey';
                            }
                        }

                        updateCartQuantity();
                    } else {
                        alert('המוצר אזל מהמלאי.');
                    }
                });
            });
        })
        .catch(error => console.error('שגיאה בטעינת inventory.json:', error));
});
