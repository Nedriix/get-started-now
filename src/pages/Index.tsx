import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VehicleFleet from "@/components/VehicleFleet";
import Motorcycles from "@/components/Motorcycles";
import Pricing from "@/components/Pricing";
import Training from "@/components/Training";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <VehicleFleet />
      <Motorcycles />
      <Pricing />
      <Training />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
