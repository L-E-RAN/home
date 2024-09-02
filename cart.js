document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let totalPrice = 0;

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        totalPrice = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            const imgElement = document.createElement('img');
            imgElement.src = item.image;
            imgElement.alt = item.name;
            imgElement.classList.add('cart-item-image');

            const detailsElement = document.createElement('div');
            detailsElement.classList.add('cart-item-details');

            const descriptionElement = document.createElement('div');
            descriptionElement.classList.add('cart-item-description');
            descriptionElement.textContent = item.name;

            const priceElement = document.createElement('div');
            priceElement.classList.add('cart-item-price');
            priceElement.textContent = `${item.price}$`;

            const quantityElement = document.createElement('div');
            quantityElement.classList.add('cart-item-quantity');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = 0;
            quantityInput.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity <= 0) {
                    cart.splice(index, 1);
                } else {
                    item.quantity = newQuantity;
                }
                updateCart();
                sessionStorage.setItem('cart', JSON.stringify(cart));
            });
            quantityElement.appendChild(quantityInput);

            const totalElement = document.createElement('div');
            totalElement.classList.add('cart-item-total');
            totalElement.textContent = `סה"כ: ${(item.price * item.quantity).toFixed(2)}$`;

            detailsElement.appendChild(descriptionElement);
            detailsElement.appendChild(priceElement);
            detailsElement.appendChild(quantityElement);
            detailsElement.appendChild(totalElement);

            itemElement.appendChild(imgElement);
            itemElement.appendChild(detailsElement);
            cartItemsContainer.appendChild(itemElement);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `סה"כ לתשלום: ${totalPrice.toFixed(2)}$`;
    }

    updateCart();
});
