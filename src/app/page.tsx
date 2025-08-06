import Hero from "@/sections/hero/Hero";
import Header from "@/components/Header";
import CategorySlider from "@/components/CategorySlider";
import Footer from "@/components/Footer";
export default function Home() {
  return (
   <>
    <Header/>
    <CategorySlider/>
    <Hero/>
    <Footer/>
   </>
  );
}