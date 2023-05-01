import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";


const stripePromise = loadStripe('pk_test_51N1sVDHPT7tGH8GNlauG8c6IUdGHuAZenelw3BEOhfh220y0B0hvEBOpcXV6V7SfZZU9W7NFaSda8fWxWOKWIUIF00vhcS479x')

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    agent.payment.createPaymentIntent()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  },[dispatch])

  if(loading) return <LoadingComponent message="Loading Checkout..."/>

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage/>
    </Elements>
  )
}