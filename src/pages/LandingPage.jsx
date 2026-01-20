import CTA from "../components/landingComponents/CTA";
import FAQ from "../components/landingComponents/FAQ";
import Features from "../components/landingComponents/Features";
import Hero from "../components/landingComponents/Hero";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ScrollToHash from "../components/common/ScrollToHash";
import About from "../components/landingComponents/About";

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
