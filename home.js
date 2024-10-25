function subscribe() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = ''; // Clear input
    } else {
        alert('Please enter a valid email address.');
    }
}
