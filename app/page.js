"use client";
import Image from "next/image";
import Header from "./components/layout/Header";
import { useAuth } from "./context/AuthContext ";
import { useEffect } from "react";
import Hero from "./components/home/Hero";

export default function Home() {
	const { user, loading } = useAuth();

	// Use useEffect to check authentication status
	useEffect(() => {});
	return (
		<div className=" ">
			<Header />
			<Hero/>
		</div>
	);
}
