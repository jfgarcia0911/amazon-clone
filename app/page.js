"use client";
import Image from "next/image";
import Header from "./components/layout/Header";
import { useAuth } from "./context/AuthContext ";
import { useEffect } from "react";
import ProductCarousel from "./components/home/ProductCarousel";
export default function Home() {
	const { user, loading } = useAuth();


  // Use useEffect to check authentication status
  useEffect(() => {
    
  })
	return (
		<div className=" ">
			<Header />
			<ProductCarousel/>
		</div>
	);
}
