import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Payment = () => {
  const KEY =
    "pk_test_51JwpL5BWwMKzdCZXHGWcrq7mPnn9bChbPihabAISBE63zU3EfjJxL0xfxHqUfkLQay70v4FoZkKprjH2sjcvzFrq00lNPvm2ZN";

  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    console.log("token : ", token);
    setStripeToken(token);
  };

  //   api call to backend
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );

        console.log("res data  :", res.data);

        history.push("/success", { data: res.data });
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, history]);

  return (
    <div className="m-5 p-5">
      <h1>Payment</h1>

      {stripeToken ? (
        <span>Processing, please wait...</span>
      ) : (
        <StripeCheckout
          name="SHOPPING"
          image="https://images.unsplash.com/photo-1593672740624-38a34ff53d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          billingAddress
          shippingAddress
          description="Your total amount is $20"
          token={onToken}
          stripeKey={KEY}
        >
          <button className="btn btn-dark">Pay Now</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Payment;
