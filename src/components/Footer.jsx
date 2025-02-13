import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { programs } from "../utils/data";

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <footer className="bg-[#282828] text-white py-12 px-6 md:px-40">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Programs Section */}
        <div className="w-full md:w-auto">
          <h2 className="text-lg font-semibold mb-4">Programs</h2>
          {programs.map((program, index) => (
            <div key={index} className="mb-3">
              <button
                className="flex justify-between w-full text-left font-medium hover:text-blue-400"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {program} <span>+</span>
              </button>
              {openIndex === index && <p className="mt-2 text-sm text-gray-300">More details about {program}</p>}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="w-full md:pl-10 md:w-[500px]">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <div className="text-sm space-y-2 md:mr-20">
            <p>Email (Data Science): <a href="mailto:admissions@accredian.com" className="text-blue-400">admissions@accredian.com</a></p>
            <p>Email (Product Management): <a href="mailto:pm@accredian.com" className="text-blue-400">pm@accredian.com</a></p>
            <p>Data Science Helpline: <span className="text-gray-300">+91 9079653292 (9 AM - 7 PM)</span></p>
            <p>Product Management Helpline: <span className="text-gray-300">+91 9625811095</span></p>
            <p>Student Helpline: <span className="text-gray-300">+91 7969322507</span></p>
            <p>Office: 4th Floor, 250, Phase IV, Udyog Vihar,
              Sector 18, Gurugram, Haryana 122015</p>
          </div>
          
          {/* Social Media Icons */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <FontAwesomeIcon icon={faFacebook} className="text-xl cursor-pointer hover:text-blue-500" />
              <FontAwesomeIcon icon={faLinkedin} className="text-xl cursor-pointer hover:text-blue-400" />
              <FontAwesomeIcon icon={faTwitter} className="text-xl cursor-pointer hover:text-blue-300" />
              <FontAwesomeIcon icon={faInstagram} className="text-xl cursor-pointer hover:text-pink-500" />
              <FontAwesomeIcon icon={faYoutube} className="text-xl cursor-pointer hover:text-red-500" />
            </div>
          </div>
        </div>

        {/* Accredian Section */}
        <div className="w-full md:pl-40 md:w-[300px]">
          <h2 className="text-lg font-semibold mb-4">Accredian</h2>
          <ul className="space-y-2 text-gray-300">
            <li>About</li>
            <li>Career</li>
            <li>Blog</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Master FAQs</li>
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600">
          Schedule 1-on-1 Call Now
        </button>
      </div>

      {/* Footer Copyright */}
      <div className="text-center text-gray-400 text-sm mt-8">
        © 2024 Accredian A Brand of FullStack Education Pvt Ltd. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
