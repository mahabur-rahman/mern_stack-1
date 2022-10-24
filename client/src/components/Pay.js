import React, { useState } from "react";
import { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const KEY =
    "pk_test_51JwpL5BWwMKzdCZXHGWcrq7mPnn9bChbPihabAISBE63zU3EfjJxL0xfxHqUfkLQay70v4FoZkKprjH2sjcvzFrq00lNPvm2ZN";

  const onToken = (token) => {
    // console.log("token : ", token);
    setStripeToken(token);
  };

  const history = useHistory();

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

        console.log(res.data);
        history.push("/success", { data: res.data });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, history]);

  return (
    <div>
      {stripeToken ? (
        <h1>Processing, please wait...</h1>
      ) : (
        <StripeCheckout
          name="mahabur shop"
          image="https://images.unsplash.com/photo-1593672740624-38a34ff53d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          billingAddress
          shippingAddress
          description="Your total is $20"
          token={onToken}
          stripeKey={KEY}
        >
          <button>Pay Now</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
