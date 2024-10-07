import React, { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

const PayPalButtonComponent = () => {
  const subtotal = useSelector((state) => state.booking.subtotal);
  const [amount, setAmount] = useState("0.01");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (subtotal) {
      setAmount(subtotal.toString());
    }
  }, [subtotal]);

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount, // Use the dynamic amount from state
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    setLoading(true);
    return actions.order
      .capture()
      .then((details) => {
        const name = details.payer.name.given_name;
        alert(`Transaction completed by ${name}`);
        setSuccess(true);
      })
      .catch(() => {
        setError("Payment could not be processed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_SANDBOX_CLIENT_ID,
        currency: "USD",
      }}
    >
      <div className="checkout">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div>Payment successful!</div>}
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={onCreateOrder}
          onApprove={onApproveOrder}
          onCancel={() => setError("Payment was canceled.")}
          onError={() => setError("An unexpected error occurred.")}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButtonComponent;
