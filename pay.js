<script>
    const stripe = Stripe('YOUR_PUBLIC_KEY'); // Replace with your public key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const { paymentIntent, error } = await stripe.confirmCardPayment('CLIENT_SECRET_FROM_SERVER', {
            payment_method: {
                card: cardElement,
                billing_details: {
                    // Add billing details if required
                }
            }
        });

        if (error) {
            // Display error to user
            document.getElementById('payment-result').innerText = error.message;
        } else {
            // Payment succeeded
            document.getElementById('payment-result').innerText = 'Payment successful! Confirmation ID: ' + paymentIntent.id;
            // Optionally, redirect to a confirmation page
            // window.location.href = 'confirmation.html';
        }
    });
</script>
