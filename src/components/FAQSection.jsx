import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { faqs } from "../utils/data";

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("Eligibility");
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center">
        Frequently Asked <span className="text-blue-600">Questions</span>
      </h2>

      {/* Sidebar & FAQ Container */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-2 md:col-span-1">
          {faqs.map((item) => (
            <button
              key={item.category}
              className={`w-full p-3 rounded-lg border transition ${
                activeCategory === item.category
                  ? "bg-white shadow text-blue-600 font-semibold"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => {
                setActiveCategory(item.category);
                setOpenIndex(null);
              }}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Questions & Answers */}
        <div className="md:col-span-3">
          {faqs
            .find((item) => item.category === activeCategory)
            ?.questions.map((faq, index) => (
              <div key={index} className="border-b py-4">
                <button
                  className="w-full flex justify-between items-center text-left text-blue-600 font-semibold"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {faq.question}
                  {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white p-6 mt-20 rounded-lg flex flex-col lg:flex-row items-center lg:justify-around">
        <img
          src="./icons/div.flex.png"
          alt="div"
          className="w-full md:w-[500px]"
        />
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow">
          Get in touch →
        </button>
      </div>
    </div>
  );
}

