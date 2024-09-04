document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let lastAddedTime = null;

    // עדכון חיווי הכמות בסל
    function updateCartQuantity() {
        const cartQuantityElement = document.getElementById('cart-quantity');
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartQuantityElement.textContent = totalQuantity;
    }

    // קריאה ראשונית לעדכון החיווי בעת טעינת הדף
    updateCartQuantity();

    // טעינת קובץ המלאי
    fetch('inventory.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            const stockButtons = document.querySelectorAll('.stock-button');
            stockButtons.forEach(button => {
                const productId = button.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                if (product) {
                    updateStockButton(button, product.stock);

                    // הסתרת כפתור "הוסף לסל" אם המלאי הוא 0
                    const addToCartButton = document.querySelector(`.add-to-cart[data-product-id="${productId}"]`);
                    if (product.stock === 0 && addToCartButton) {
                        addToCartButton.style.display = 'none';
                    }
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
                        lastAddedTime = Date.now(); // שמירת זמן הוספת הפריט האחרון
                        alert(`${product.name} נוסף לסל הקניות.`);

                        // עדכון כפתור המלאי לאחר הוספת מוצר לסל
                        const stockButton = document.querySelector(`.stock-button[data-product-id="${productId}"]`);
                        if (stockButton) {
                            updateStockButton(stockButton, product.stock);
                        }

                        // הסתרת כפתור "הוסף לסל" אם המלאי הפך ל-0
                        if (product.stock === 0) {
                            button.style.display = 'none';
                        }

                        // עדכון חיווי הכמות בסל
                        updateCartQuantity();
                    } else {
                        alert('המוצר אזל מהמלאי.');
                    }
                });
            });

            // פונקציה לניקוי הסל אחרי 10 דקות
            setInterval(() => {
                if (lastAddedTime && (Date.now() - lastAddedTime > 10 * 60 * 1000)) { // 10 דקות
                    cart = [];
                    sessionStorage.removeItem('cart');
                    alert('הסל שלך נוקה בגלל חוסר פעילות של 10 דקות.');
                    location.reload(); // רענון העמוד לאחר ניקוי הסל
                }
            }, 60 * 1000); // בדיקה כל דקה
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
