import React, { useState } from "react";

import ReferralModal from "./ReferralModal";



const ReferSection = () => {
 
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <div className="mt-20 bg-blue-50 py-12 px-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        How Do I <span className="text-blue-600">Refer?</span>
      </h2>
      <div className="max-w-6xl">
      <img src="./icons/Group 22094.png" alt="group"/>
      </div>

      {/* Refer Now Button */}
      <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition" onClick={() => setIsOpen(true)}>
        Refer Now 
      </button>
       
     {/* Referral Modal */}
     {isOpen && <ReferralModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
         
    </div>
  );
};

export default ReferSection;
