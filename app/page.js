"use client";
import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";
import SecondaryNav from "./components/layout/SecondaryNav";
export default function Home() {
	
	return (
		<div  className=" ">
			<Header />
			<SecondaryNav />
			<Hero />

			<Footer  />
		</div>
	);
}
