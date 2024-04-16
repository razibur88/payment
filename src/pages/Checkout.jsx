import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

const Checkout = () => {
  const [email, setEmail] = useState("");

  const onToken = (token) => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        setEmail(data.email);
      });
    });
  };
  const db = getDatabase();
  let data = useSelector((state) => state.single.cartItem);
  let [datacheck, setDatacheck] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        setDatacheck(item.val());
      });
    });
  }, []);

  const { totalPrice, totalQuantity } = data.reduce(
    (acc, item) => {
      acc.totalPrice += item.price * item.qun;
      acc.totalQuantity += item.qun;
      return acc;
    },
    { totalPrice: 0, totalQuantity: 0 }
  );
  return (
    <Container>
      <h2>{datacheck.username}</h2>
      <h2>{datacheck.email}</h2>
      <p>{totalPrice}</p>
      <p>{totalQuantity}</p>
      <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51P69J3Fh7ByLrq00aQK8MYRBgepxLreuePvfkAhJo2oSG5Skm27uIYC2yIiAbcrfrwkT4MZ7xR2UT3Zc0WM6swo300NbeK2YHM"
      />
    </Container>
  );
};

export default Checkout;
