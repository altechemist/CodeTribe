import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

// Get the client ID from the environment variable
const clientId = import.meta.env.VITE_SANDBOX_CLIENT_ID;

// Log the client ID for debugging
console.log("PayPal Client ID:", clientId);

const initialOptions = {
  clientId: clientId,
  currency: "ZAR",
  intent: "capture",
};

export default function PayPalButtonComponent() {
  const subtotal = useSelector((state) => state.booking.subtotal);
  const [amount, setAmount] = useState("0.01");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get subtotal from redux state
  useEffect(() => {
    if (subtotal) {
      setAmount(subtotal.toString());
    }
  }, [subtotal]);

  const handleApprove = (data, actions) => {
    setLoading(true);
    setError(null); // Reset error

    return actions
      .capture()
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setError("Payment could not be processed. Please try again.");
        setLoading(false);
      });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div>Payment successful!</div>}
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount, // Use the dynamic amount from state
                  },
                },
              ],
            });
          }}
          onApprove={handleApprove}
          onCancel={() => setError("Payment was canceled.")}
          onError={(err) => setError("An unexpected error occurred.")}
          style={{ layout: "vertical", fundingSource: "paypal" }}
          disabled={loading} // Disable button while loading
        />
      </div>
    </PayPalScriptProvider>
  );
}
