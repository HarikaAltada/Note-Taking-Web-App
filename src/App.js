import React from "react";
import Navbar from "./components/Navbar";
import ReferralBanner from "./components/Hero.jsx";
import ReferSection from "./components/ReferSection";
import ReferralBenefits from "./components/ReferralBenfits.jsx";
import FAQSection from "./components/FAQSection.jsx";
import Footer from "./components/Footer.jsx";
const App = () => {
  return (
    <div>
    <Navbar/>
    <ReferralBanner/>
    <ReferSection/>
    <ReferralBenefits/>
    <FAQSection/>
    <Footer/>
    </div>
  );
};

export default App;
