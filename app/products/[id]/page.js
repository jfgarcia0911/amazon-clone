import React from 'react'
// import { useParams } from "next/navigation"; // App Router
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default async function ProductsById({params}) {
  const productId = (await params).id;
  // const {id} = useParams();
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const docRef = doc(db, "amazon-products", id);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setProduct(docSnap.data());
  //     } else {
  //       console.log("No such document!");
  //     }
  //   };
  //   fetchProduct();
  // }, [id]);
const docRef = doc(db, "amazon-products", productId);
  const docSnap = await getDoc(docRef);

console.log("Product ID:", docSnap.data());
  return (
    <div>
      {/* {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.pricing.costPrice}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}3
    </div>
  )
}
