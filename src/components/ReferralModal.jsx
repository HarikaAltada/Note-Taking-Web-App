import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReferralModal = ({ isOpen, onClose}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referredName: "",
    referredEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/referrals", formData);

      if (response.status === 201) {
        toast.success("Referral submitted successfully!", { position: "top-center", autoClose: 3000 });

        // Close the modal after a short delay
        setTimeout(() => {
          onClose();
          setFormData({
            name: "",
            email: "",
            referredName: "",
            referredEmail: "",
          });
        }, 1000);
      } else {
        toast.error("Something went wrong. Please try again.", { position: "top-center", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error.response?.data?.error || "Please try again."}`, { position: "top-center", autoClose: 3000 });
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-[460px] h-[450px]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Referral Form
          </h2>

          {/* Referral Form */}
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Your Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </label>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Your Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </label>

            <label className="block mb-3 text-sm font-medium text-gray-700">
              Referee Name
              <input
                type="text"
                name="referredName"
                value={formData.referredName}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter referee's name"
                required
              />
            </label>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Referee Email
              <input
                type="email"
                name="referredEmail"
                value={formData.referredEmail}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter referee's email"
                required
              />
            </label>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* ToastContainer should always be in the DOM */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default ReferralModal;
