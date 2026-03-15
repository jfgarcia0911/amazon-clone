import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export default function useCartQuantity(user) {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (!user) {
      setCartQuantity(0);
      return;
    }

    const itemsRef = collection(db, "amazon-carts", user.uid, "items");

    const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
      let total = 0;
      snapshot.forEach((doc) => {
        total += doc.data().quantity;
      });

      setCartQuantity(total);
    });

    return () => unsubscribe();
  }, [user]);

  return cartQuantity;
}