import React from "react";
import { FloatingDockDemo } from "./FloatingDockDemo";
import FooterImage from "/Footer.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="p-4 min-h-screen 2xl:min-h-0">
      <div className="mt-10 mb-10 ml-4 md:ml-[117px] flex items-center">
        <h1 className="font-meuthanies text-2xl">Paxo Wealth</h1>
      </div>

      {/* Navigation Links and Contact Section */}
      <div className="md:flex items-start md:px-[120px] md:gap-x-12 xl:gap-x-36  px-5 font-sf-pro justify-between">
        {/* Navigation Links */}
        <div className="text-sm md:text-md xl:text-xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-x-12 xl:gap-x-36 mb-10">
          <Link to="/" className="hover:text-customBlue">
            Home
          </Link>
          <Link to="/boost-income" className="hover:text-customBlue">
            Boost Income
          </Link>
          <Link to="/disclaimer" className="hover:text-customBlue">
            Disclaimer
          </Link>
          <Link to="/terms" className="hover:text-customBlue">
            Terms & Conditions
          </Link>
          <Link to="/about-us" className="hover:text-customBlue">
            About Us
          </Link>
          <Link to="/rent-rise" className="hover:text-customBlue">
            Rent Rise
          </Link>
          <Link to="/blog" className="hover:text-customBlue">
            Blog
          </Link>
          <Link to="/faq" className="hover:text-customBlue">
            FAQs
          </Link>
          <Link to="/contact-us" className="hover:text-customBlue">
            Contact Us
          </Link>
          <Link to="/refund-policy" className="hover:text-customBlue">
            Refund Policy
          </Link>
          <Link to="/how-it-works" className="hover:text-customBlue">
            How It Works
          </Link>
          <Link to="/privacy-policy" className="hover:text-customBlue">
            Privacy Policy
          </Link>
        </div>

        {/* Contact Section */}
        <div className="mb-8 font-sf-pro ">
          <p className="text-sm xl:text-xl">Contact</p>
          <br />
          <p className="text-[13px]">
            PAXO Wealth NESCO IT Park, <br className="md:block hidden" />
            Building 4, North Wing, <br className="md:block hidden" />
            Western Express Hwy, Goregaon, <br className="md:block hidden" />
            Mumbai, Maharashtra 400063
          </p>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="md:px-[120px] px-5">
        <hr className="border-t border-gray-600 mx-auto md:mb-10" />
      </div>

      {/* Legal Disclaimer and Floating Dock */}
      <div className="md:flex md:p-0 p-5 justify-between font-sf-pro">
        <div className="md:ml-[120px]">
          <p className="xl:text-xl">Legal Disclaimer</p>
          <p className="mt-3 xl:text-xl">
            Registration Number : U70100MH2024PTC874590
          </p>
          <p className=" mt-3 text-[13px] xl:text-xl opacity-50">
            All transactions involve market risks. Users are advised to perform
            due diligence.
          </p>
        </div>
        <div className="md:mt-10 pr-[98px]">
          <FloatingDockDemo />
        </div>
      </div>

      {/* Footer Image Section */}
      <div className="md:mt-20 mt-4 font-sf-pro">
        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            <img src={FooterImage} alt="Footer Image" className="" />
            <img src={FooterImage} alt="Footer Image" className="" />
            <img src={FooterImage} alt="Footer Image" className="" />
          </div>
        </div>
        <div className="justify-between mt-2 md:flex md:px-40 text-sm font-light">
          <div className="cursor-pointer text-[#dc0606]">
            <p>Copyright2025@paxowealth.all rights reserved.</p>
          </div>
          <div className="md:flex hidden gap-10 text-[#dc0606]">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
