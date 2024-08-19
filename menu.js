let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(item) {
    if (cart[item]) {
        cart[item]++;
    } else {
        cart[item] = 1;
    }
    updateCart();
}

function removeFromCart(item) {
    if (cart[item]) {
        cart[item]--;
        if (cart[item] === 0) {
            delete cart[item];
        }
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));

    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        let totalItems = 0;
        for (let item in cart) {
            totalItems += cart[item];
        }
        cartCount.textContent = totalItems;
    }

    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';

        for (let item in cart) {
            const li = document.createElement('li');
            li.innerHTML = `${item} x${cart[item]} <span class="remove-item" onclick="removeFromCart('${item}')">&times;</span>`;
            cartItems.appendChild(li);
        }

        const placeOrderBtn = document.getElementById('place-order-btn');
        if (placeOrderBtn) {
            placeOrderBtn.style.display = Object.keys(cart).length > 0 ? 'block' : 'none';
        }
    }
}

function placeOrder() {
    window.location.href = 'information.html'; // Redirect to information.html
}

function clearCartOnLoad() {
    if (window.location.pathname === '/home.html' || window.location.pathname === '/' || window.location.pathname === '/contact.html') {
        cart = {};
        updateCart();
        localStorage.removeItem('cart');
    } else {
        updateCart();
    }
}

document.addEventListener('DOMContentLoaded', clearCartOnLoad);
