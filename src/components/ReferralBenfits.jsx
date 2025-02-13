import React, { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { programsData } from "../utils/data";
import { categories } from "../utils/data";
import ReferralModal from "./ReferralModal";
import { Switch } from "@mui/material";

const ReferralBenefits = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL PROGRAMS");
  const [enrolled, setEnrolled] = useState(false);
const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="hidden md:flex flex-col items-center p-6 min-h-screen">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6">
        What Are The <span className="text-blue-600">Referral Benefits?</span>
      </h2>
      <div className="absolute right-48">
            <label className="flex pr-20 pt-8 text-gray-700">
              <span className="mt-2">Enrolled</span>
              <Switch
               checked={enrolled}
              onChange={() => setEnrolled(!enrolled)}
               color="primary"
    />
            </label>
          </div>
      {/* Container */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow-xl w-64 p-4">
          <button className="w-full text-left font-semibold text-blue-600 p-2">ALL PROGRAMS</button>
          <hr className="mb-2" />
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left p-2 hover:bg-gray-100 ${
                selectedCategory === category ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-xl p-4 w-[800px]">
          {/* Enrolled Toggle */}

          {/* Table */}
          <table className="w-full bg-[#f8fbff] border-collapse">
            <thead>
              <tr className="bg-[#afcef7] text-[#1350a0]">
                <th className="p-2 text-left">Programs</th>
                <th className="p-2">Referrer Bonus</th>
                <th className="p-2">Referee Bonus</th>
              </tr>
            </thead>
            <tbody>
              {programsData.map((program, index) => (
                <tr key={index} className="border-b text-gray-700">
                  <td className="p-2 flex items-center gap-2 w-[450px]">
                    <FaGraduationCap className="text-blue-600" />
                    {program.name}
                  </td>
                  <td className="p-2 text-center w-[450px]">₹ {program.referrer.toLocaleString()}</td>
                  <td className="p-2 text-center w-[450px]">₹ {program.referee.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Show More Button */}
          <div className="flex justify-center mt-4">
            <button className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
              Show More ▼
            </button>
          </div>
        </div>
      </div>

      {/* Refer Now Button */}
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700" onClick={() => setIsOpen(true)}>
        Refer Now
      </button>
      {isOpen && <ReferralModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ReferralBenefits;
