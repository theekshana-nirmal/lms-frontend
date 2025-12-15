import About from "@/components/About";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollToHash from "@/components/layout/ScrollToHash";

const LandingPage = () => {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <About />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;
