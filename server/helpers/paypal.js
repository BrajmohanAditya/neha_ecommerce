const paypal = require("paypal-rest-sdk");

const PAYPAL_MODE = process.env.PAYPAL_MODE || "sandbox"; // 'sandbox' or 'live'
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

paypal.configure({
  mode: PAYPAL_MODE,
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_CLIENT_SECRET,
});

module.exports = paypal;
