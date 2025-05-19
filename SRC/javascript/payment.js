
    "use strict"
    const paymentForm = document.getElementById('payment-form');
    const paymentResponse = document.getElementById('payment-response');
    const backendUrl = 'https://fitnessapp-backend-io41.onrender.com'; // Replace with your actual backend URL

    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const amount = document.getElementById('amount').value;
        const mobile = document.getElementById('mobile').value;

        // Initiate Paystack payment
        let handler = PaystackPop.setup({
            key: `pk_test_6821d21281d483cb9efd689825a162e6c5b3ee51`, // Replace with your actual public key
            email: email,
            amount: amount * 100, // Amount in kobo
            currency: 'NGN',
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference
            metadata: {
                mobile_number: mobile
            },
            callback: function(response) {
                // This callback is called when the customer has completed the payment process
                // on Paystack's end.  It does NOT mean the payment was necessarily successful.
                // We need to verify on our server.
                console.log(response); // Log the response for debugging

                paymentResponse.textContent = 'Processing payment...'; // Initial feedback to user

                // Send the transaction reference to your server for verification
                fetch(`${backendUrl}/verify-payment`, {
                    method: 'POST',
            
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ reference: response.reference })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Payment successful') {
                        paymentResponse.textContent = `Payment successful! Transaction Reference: ${data.data.reference}`;
                        paymentResponse.className = 'success'; //add success class
                        // Here you might also redirect the user to a success page, update the UI, etc.
                    } else {
                        paymentResponse.textContent = `Payment failed: ${data.message}`;
                        paymentResponse.className = 'error';  //add error class
                        //  You might want to provide more informative feedback to the user.
                    }
                })
                .catch(error => {
                    console.error('Error verifying payment:', error);
                    paymentResponse.textContent = 'Error verifying payment. Please try again.';
                    paymentResponse.className = 'error'; //add error class
                });
            },
            onClose: function() {
                // This is called when the user closes the Paystack modal
                paymentResponse.textContent = 'Payment was cancelled.';
                paymentResponse.className = 'error'; //add error class
            }
            , fullscreen: true,
        });
        handler.openIframe();
    });
    