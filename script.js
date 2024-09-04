document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let lastAddedTime = null;

    // פונקציה שמעדכנת את חיווי הכמות בסל ושומרת את העגלה בשרת
    function updateCartQuantity() {
        const cartQuantityElement = document.getElementById('cart-quantity');
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartQuantityElement.textContent = totalQuantity;

        // שליחה לשרת לעדכון עגלה
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

    // משיכת נתוני מלאי
    fetch('inventory.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // פונקציה לטיפול בהוספת מוצר לעגלה
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
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                                quantity: 1
                            });
                        }

                        product.stock -= 1;
                        sessionStorage.setItem('cart', JSON.stringify(cart));
                        lastAddedTime = Date.now();

                        // הצגת Toast
                        showToast(`${product.name} נוסף לסל הקניות.`);

                        // עדכון חיווי הכמות בסל
                        updateCartQuantity();

                        // עדכון מלאי בכפתור
                        const stockButton = document.querySelector(`.stock-button[data-product-id="${productId}"]`);
                        if (stockButton) {
                            const stockAvailable = product.stock;
                            stockButton.textContent = `כמות במלאי: ${stockAvailable}`;

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
                                button.style.display = 'none';
                            }
                        }
                    } else {
                        alert('המוצר אזל מהמלאי.');
                    }
                });
            });
        })
        .catch(error => console.error('Error loading inventory:', error));
});
