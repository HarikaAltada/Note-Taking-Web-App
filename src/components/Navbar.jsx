import { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Top Banner */}
      <div className="w-full py-2 text-center bg-[#ddeafc]">
        <p className="text-gray-700 text-sm">
          Navigate your ideal career path with tailored expert advice{" "}
          <a href="#" className="text-blue-500 ml-2 font-semibold hover:underline">
            Contact Expert
          </a>
        </p>
      </div>

      {/* Navbar */}
      <nav className="text-white px-4 py-4 flex justify-between lg:justify-around items-center relative bg-white shadow-md">
        {/* Left - Logo & Courses Button */}
        <div className="flex items-center gap-8 font-semibold">
          <div>
            <span className="text-blue-500 text-2xl">accreditian</span>
            <p className="text-xs text-gray-400 text-md">academic hard acumen</p>
          </div>
          <div className="hidden md:block mt-2">
            <button
              className="bg-blue-500 text-md text-white px-4 py-2 rounded-lg flex items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              Courses <FaChevronDown className="ml-2" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Right - Menu (Responsive) */}
        <div
          className={`absolute top-full right-0 w-full md:w-auto md:static md:flex bg-white md:bg-transparent p-5 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
            menuOpen ? "flex flex-col md:flex-row" : "hidden md:flex"
          }`}
        >
          <div className="space-y-4 md:space-x-6 md:space-y-0 flex flex-col md:flex-row items-center">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Refer & Earn
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Resources
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              About Us
            </a>
          </div>
          <div className="mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center">
            <a href="https://accredian.com/login" className="bg-gray-300 ml-4 text-black px-4 py-2 rounded-lg w-full md:w-auto">
              Login
            </a>
            <a href="https://trial.accredian.com/" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto">
              Try for free
            </a>
          </div>
        </div>
      </nav>

      {/* Centered Rounded Navigation Bar */}
      <div className="mt-6 flex justify-center px-4">
        <nav className="bg-[#e6f0fc] w-full max-w-xl rounded-full p-2 flex justify-center space-x-6 lg:space-x-20 overflow-x-auto whitespace-nowrap">
          <a className="text-[#1A73E8] text-[17px] font-medium cursor-pointer hover:text-blue-700">
            Refer
          </a>
          <a className="text-[#4B4B4B] text-[17px] font-medium cursor-pointer hover:text-gray-700">
            Benefits
          </a>
          <a className="text-[#4B4B4B] text-[17px] font-medium cursor-pointer hover:text-gray-700">
            FAQs
          </a>
          <a className="text-[#4B4B4B] text-[17px] font-medium cursor-pointer hover:text-gray-700">
            Support
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
