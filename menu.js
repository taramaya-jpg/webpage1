let cart = []; // Initialize an empty cart
let total = 0; // Initialize total amount
let orderId = 1; // Initialize the order ID

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    
    total += itemPrice;
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('totalAmount').innerText = `Total Amount: $${total.toFixed(2)}`;
}

// Function to remove items from the cart
function removeFromCart(itemName) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        total -= cart[itemIndex].price * cart[itemIndex].quantity;
        cart.splice(itemIndex, 1);
        updateCartDisplay();
    }
}

// Function to finalize the order and generate an order ID
function finalizeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderSummary = `
        <h3>Order Summary</h3>
        <p>Order ID: ${orderId}</p>
        <p>Total Amount: $${total.toFixed(2)}</p>
        <h4>Items Ordered:</h4>
    `;
    
    cart.forEach(item => {
        orderSummary += `<p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>`;
    });

    alert(orderSummary);
    
    // Reset cart and order details
    cart = [];
    total = 0;
    orderId++;
    updateCartDisplay();
    
    // Scroll to table booking section
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });

    // Optionally, pre-fill the number of people in the booking form
    document.getElementById('totalPeople').value = getTotalPeople(); // Adjust this function as necessary
}

// Function to get total number of people from the cart
function getTotalPeople() {
    // Assuming 1 item = 1 person; you can adjust this logic as per your needs
    return cart.reduce((acc, item) => acc + item.quantity, 0);
}