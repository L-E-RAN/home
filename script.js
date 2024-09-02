document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // טעינת קובץ המלאי
    fetch('inventory.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // עדכון כפתורי המלאי
            const stockButtons = document.querySelectorAll('.stock-button');
            stockButtons.forEach(button => {
                const productId = button.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                if (product) {
                    updateStockButton(button, product.stock);
                }
            });

            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
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

                        product.stock -= 1; // עדכון המלאי
                        sessionStorage.setItem('cart', JSON.stringify(cart));
                        saveInventory(products); // שמירת המלאי לאחר עדכון
                        alert(`${product.name} נוסף לסל הקניות.`);

                        // עדכון כפתור המלאי לאחר הוספת מוצר לסל
                        const stockButton = document.querySelector(`.stock-button[data-product-id="${productId}"]`);
                        if (stockButton) {
                            updateStockButton(stockButton, product.stock);
                        }
                    } else {
                        alert('המוצר אזל מהמלאי.');
                    }
                });
            });
        })
        .catch(error => console.error('Error loading inventory:', error));

    // פונקציה לשמירת המלאי המעודכן
    function saveInventory(products) {
        fetch('save_inventory.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ products })
        }).then(response => response.json())
          .then(data => {
              console.log('מלאי נשמר בהצלחה');
          });
    }

    // פונקציה לעדכון כפתור המלאי
    function updateStockButton(button, stock) {
        button.textContent = `כמות במלאי: ${stock}`;
        if (stock > 1) {
            button.style.backgroundColor = 'green';
            button.style.color = 'white';
        } else if (stock === 1) {
            button.style.backgroundColor = 'red';
            button.style.color = 'black';
        } else {
            button.style.backgroundColor = 'grey';
            button.style.color = 'white';
        }
    }
});
