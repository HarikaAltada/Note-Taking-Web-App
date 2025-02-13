import React, { useState } from "react";
import ReferralModal from "./ReferralModal"; // Import modal

const ReferralBanner = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <>
      <div className="lg:relative mt-6 flex flex-col md:flex-row justify-between items-center bg-blue-50 p-6 rounded-3xl max-w-4xl h-auto md:h-[480px] mx-auto shadow-2xl text-center md:text-left">
        {/* Floating Money at the Top (Hidden on small screens) */}
        <img
          src="./icons/Anniversary (8) 1 (1).png"
          alt="Floating Money"
          className="absolute top-[-3px] left-1/4 transform -translate-x-1/2 h-[50px] w-[60px] z-20 hidden sm:block"
        />

        {/* Left Section - Text Content */}
        <div className="w-full lg:pl-3 md:w-1/2 flex flex-col items-center md:items-start space-y-4">
          <img 
            src="./icons/Group 22035.png" 
            alt="group" 
            className="w-40 sm:w-[350px]" // Responsive width 
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
            onClick={() => openModal("ReferralBanner")}
          >
            Refer Now
          </button>
        </div>

        {/* Right Section - Image & Mockup (Hidden on small screens) */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          <img
            src="./icons/Anniversary (7) 1.png"
            alt="Happy People"
            width={1000}
            height={900}
            className="relative z-10 hidden md:block"
          />
        </div>

        {/* Floating Money at the Bottom (Hidden on small screens) */}
        <img
          src="./icons/Anniversary (8) 1 (1).png"
          alt="Floating Money"
          className="absolute bottom-[-3px] left-3/4 transform -translate-x-1/2 h-[50px] w-[60px] z-20 hidden sm:block"
        />
      </div>

      {/* Referral Modal - Only show when `modalType` matches */}
      {modalType === "ReferralBanner" && <ReferralModal isOpen={true} onClose={closeModal} type={modalType} />}
    </>
  );
};

export default ReferralBanner;
