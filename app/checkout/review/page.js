'use client'
import { useCheckoutContext } from "../../context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const { cartItems, shippingInfo } = useCheckoutContext();
	const router = useRouter();


  const handleConfirm = () => {
    // Save order to DB (Firebase, etc.)
    router.push("/checkout/success");
  };

  return (
    <div>
      <h1>Review Your Order</h1>
      <p>Shipping to: {shippingInfo.address}</p>
      {cartItems.map((item, i) => (
        <p key={i}>{item.name} - {item.quantity}</p>
      ))}
      <button onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
}