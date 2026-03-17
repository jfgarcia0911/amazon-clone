import { connection } from "next/server";
import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";
import SecondaryNav from "./components/layout/SecondaryNav";
export default async function Home() {
  await connection(); // 👈 makes the page dynamic
  return (
    <div>
      <Header />
      <SecondaryNav />
      <Hero />
      <Footer />
    </div>
  );
}