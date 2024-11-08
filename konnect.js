/**
 * Konnect Payment Integration Library
 */

// Constants
const KONNECT_SANDBOX_API_URL = 'https://api.preprod.konnect.network/api/v2';
const KONNECT_PRODUCTION_API_URL = 'https://api.konnect.network/api/v2';

/**
 * Initializes a new payment with Konnect.
 * @param {object} options - The payment options.
 * @param {string} options.receiverWalletId - The Konnect wallet ID of the payment receiver.
 * @param {number} options.amount - The amount to be paid (in Millimes for TND / Centimes for EUR and USD).
 * @param {string} [options.currency] - The currency of the payment (default is 'TND').
 * @param {string} [options.description] - A description for the payment.
 * @param {string} [options.environment] - The Konnect environment to use ('sandbox' or 'production', default is 'sandbox').
 * @param {string} apiKey - The Konnect API key.
 * @returns {Promise<string>} - The payment URL.
 */
async function initPayment(options, apiKey) {
  // Prepare the payment request payload
  const paymentRequest = {
    receiverWalletId: options.receiverWalletId,
    amount: options.amount,
    token: options.currency || 'TND',
    description: options.description,
    // Add other required parameters
  };

  // Determine the API base URL based on the environment
  const apiBaseUrl = options.environment === 'production'
    ? KONNECT_PRODUCTION_API_URL
    : KONNECT_SANDBOX_API_URL;

  // Make the request to the /payments/init-payment endpoint
  const response = await fetch(`${apiBaseUrl}/payments/init-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify(paymentRequest)
  });

  // Handle the response and return the payment URL
  const { payUrl } = await response.json();
  return payUrl;
}

/**
 * Integrates the "Buy Now" button with the Konnect payment flow.
 * @param {object} options - The payment options.
 * @param {string} options.receiverWalletId - The Konnect wallet ID of the payment receiver.
 * @param {number} options.amount - The amount to be paid (in Millimes for TND / Centimes for EUR and USD).
 * @param {string} [options.currency] - The currency of the payment (default is 'TND').
 * @param {string} [options.description] - A description for the payment.
 * @param {string} [options.environment] - The Konnect environment to use ('sandbox' or 'production', default is 'sandbox').
 * @param {string} apiKey - The Konnect API key.
 * @param {string} [buttonSelector] - The CSS selector for the "Buy Now" button (default is '#buy-now-button').
 */
function integrateKonnectPayment(options, apiKey, buttonSelector = '#buy-now-button') {
  const buttonEl = document.querySelector(buttonSelector);
  if (!buttonEl) {
    console.error(`No element found for the selector: ${buttonSelector}`);
    return;
  }

  buttonEl.addEventListener('click', async () => {
    try {
      const payUrl = await initPayment({
        receiverWalletId: options.receiverWalletId,
        amount: options.amount,
        currency: options.currency,
        description: options.description,
        environment: options.environment
      }, apiKey);

      // Redirect the user to the payment URL
      window.location.href = payUrl;
    } catch (error) {
      console.error('Error initializing payment:', error);
      // Handle error, e.g., display an error message to the user
    }
  });
}

// Retrieve the API key from the script tag's parameters
const scriptElement = document.currentScript;
const apiKey = scriptElement.getAttribute('data-api-key');