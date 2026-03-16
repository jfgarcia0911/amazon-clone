'use client'
import { useRouter } from "next/navigation";


export default function PaymentPage() {
  const router = useRouter();
  const handlePayment = () => {
    // Mock payment or integrate Stripe/PayPal
    router.push("/checkout/review");
  };

  return (
    <div>
      <h1>Payment</h1>
      <p>Mock payment step here</p>
      <button onClick={handlePayment}>Proceed to Review</button>
    </div>
  );
}