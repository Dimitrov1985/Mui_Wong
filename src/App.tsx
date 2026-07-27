import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Benefits from "./components/Benefits";
import WhyTrain from "./components/WhyTrain";
import Included from "./components/Included";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Benefits />
        <WhyTrain />
        <Included />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
