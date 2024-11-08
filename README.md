# Konnect Payment Integration

This is a JavaScript library that integrates the Konnect payment gateway into your web application. It provides a simple "Buy Now" button that customers can click to initiate the payment process.

## Features

- Initializes a new payment with the Konnect API
- Handles the payment URL redirection
- Supports both Sandbox and Production environments
- Secure API key integration

## Installation

To use the Konnect payment integration library, follow these steps:

1. Include the `konnect.js` file in your HTML:

```html
<script src="konnect.js" data-api-key="your-api-key-here"></script>
```

2. Create a "Buy Now" button in your HTML:

```html
<button id="buy-now-button">Buy Now</button>
```

3. Initialize the Konnect payment integration in your JavaScript code:

```javascript
integrateKonnectPayment({
  receiverWalletId: 'your-receiver-wallet-id',
  amount: 1000, // in Millimes
  currency: 'TND',
  description: 'Example payment',
  environment: 'sandbox' // or 'production'
}, apiKey);
```

Make sure to replace `'your-receiver-wallet-id'` with the actual Konnect wallet ID of the payment receiver, and `'your-api-key-here'` with your Konnect API key.

## API Reference

### `initPayment(options, apiKey)`

Initializes a new payment with the Konnect API.

**Parameters:**
- `options`: An object containing the payment options.
  - `receiverWalletId`: The Konnect wallet ID of the payment receiver.
  - `amount`: The amount to be paid (in Millimes for TND / Centimes for EUR and USD).
  - `currency`: The currency of the payment (default is 'TND').
  - `description`: A description for the payment.
  - `environment`: The Konnect environment to use ('sandbox' or 'production', default is 'sandbox').
- `apiKey`: The Konnect API key.

**Returns:**
- A Promise that resolves to the payment URL.

### `integrateKonnectPayment(options, apiKey, [buttonSelector])`

Integrates the "Buy Now" button with the Konnect payment flow.

**Parameters:**
- `options`: An object containing the payment options (same as `initPayment`).
- `apiKey`: The Konnect API key.
- `buttonSelector`: The CSS selector for the "Buy Now" button (default is '#buy-now-button').

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.