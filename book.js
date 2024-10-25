let cart = []; // Initialize an empty cart
let total = 0; // Initialize total amount
let orderId = 1; // Initialize the order ID
const tables = [
    { tableNumber: 1, isBooked: false },
    { tableNumber: 2, isBooked: false },
    { tableNumber: 3, isBooked: false },
    { tableNumber: 4, isBooked: false },
    { tableNumber: 5, isBooked: false },
    { tableNumber: 6, isBooked: false },
];

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
    return cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Function to check if a table is available
function checkTableAvailability() {
    const tableSelect = document.getElementById('tableNumber');
    tableSelect.innerHTML = ''; // Clear existing options

    tables.forEach(table => {
        const option = document.createElement('option');
        option.value = table.tableNumber;
        option.textContent = `Table ${table.tableNumber} - ${table.isBooked ? 'Booked' : 'Available'}`;
        tableSelect.appendChild(option);
    });
}

// Function to book a table
function bookTable(event) {
    event.preventDefault(); // Prevent form submission

    const tableNumber = parseInt(document.getElementById('tableNumber').value);
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const totalPeople = document.getElementById('totalPeople').value;
    const specialRequest = document.getElementById('specialRequest').value;

    const table = tables.find(t => t.tableNumber === tableNumber);

    if (table && !table.isBooked) {
        // Book the table
        table.isBooked = true;
        alert(`Table ${tableNumber} booked successfully for ${name} on ${date} at ${time}.`);
        checkTableAvailability(); // Refresh table availability
    } else {
        alert(`Table ${tableNumber} is already booked! Please select another table.`);
    }
}

// Add event listener to booking form
document.getElementById('bookingForm').addEventListener('submit', bookTable);
checkTableAvailability(); // Initial call to display table availability


// Function to handle checkout
function checkoutTable(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('checkoutName').value;
    const phone = document.getElementById('checkoutPhone').value;
    const tableNumber = parseInt(document.getElementById('checkoutTableNumber').value);
    
    // Find the table in the tables array
    const table = tables.find(t => t.tableNumber === tableNumber);

    // Check if the table is booked
    if (table && table.isBooked) {
        // Here you would normally verify with a backend system or additional logic
        // Assuming we confirm based on name and phone only for this example
        alert(`Checkout successful for ${name}. Table ${tableNumber} is now available.`);
        
        // Release the table
        table.isBooked = false;

        // Clear input fields
        document.getElementById('checkoutName').value = '';
        document.getElementById('checkoutPhone').value = '';
        checkTableAvailability(); // Refresh table availability
    } else {
        alert(`Table ${tableNumber} is not booked or does not exist!`);
    }
}

// Add checkout functionality in HTML
document.getElementById('checkoutForm').addEventListener('submit', checkoutTable);
