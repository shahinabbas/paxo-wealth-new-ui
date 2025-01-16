import React from "react";
import { FloatingDockDemo } from "./FloatingDockDemo";
import Logo from "/paxowealth.png";
import FooterImage from "/Footer.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="p-4 min-h-screen">
      <div className="mt-10 mb-10 ml-4 md:ml-[117px] flex items-center">
        {/* <img src={Logo} alt="" className="w-60 h-60" /> */}
        <h1 className="font-meuthanies text-2xl">Paxo Wealth</h1>
      </div>

      <div className="md:flex gap-36 items-center justify-center font-sf-pro">
        <div className="flex gap-20 md:ml-0 ml-5  md:items-center md:justify-center">
          <div className="text-sm grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 gap-x-14 mb-10">
            <Link to="/" className="hover:text-customGreen">
              Home
            </Link>
            <Link to="/boost-income" className="hover:text-customGreen">
              Boost Income
            </Link>
            <Link to="/disclaimer" className="hover:text-customGreen">
              Disclaimer
            </Link>
            <Link to="/terms" className="hover:text-customGreen">
              Terms & Conditions
            </Link>
            <Link to="/about-us" className="hover:text-customGreen">
              About Us
            </Link>
            <Link to="/rent-rise" className="hover:text-customGreen">
              Rent Rise
            </Link>
            <Link to="/blog" className="hover:text-customGreen">
              Blog{" "}
            </Link>
            <Link to="/faq" className="hover:text-customGreen">
              FAQs
            </Link>
            <Link to="/contact-us" className="hover:text-customGreen">
              Contact Us
            </Link>
            <Link to="/direct-save" className="hover:text-customGreen">
              Direct Save{" "}
            </Link>
            <Link to="/how-it-works" className="hover:text-customGreen">
              How It Works
            </Link>
            <Link to="/privacy-policy" className="hover:text-customGreen">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="md:mb-10 p-5 md:p-0 font-sf-pro">
          <p>Contact</p>
          <br />
          {/* <p>info@paxowealth.com</p> */}
          {/* <p>+91-XXXXXXXXXX</p> */}
          <p className="text-[13px]">
            PAXO Wealth, NESCO IT Park,
            <br /> Building 4, North Wing, <br />
            Western Express Hwy,
            <br /> Goregaon, Mumbai, Maharashtra
          </p>
        </div>
      </div>

      <hr className="border-t border-gray-600 md:w-[1000px]  mx-auto md:mb-10" />
      <div className="md:flex md:p-0 p-5 font-sf-pro">
        <div className="md:ml-[120px]">
          <p>Legal Disclaimer</p>
          <p className="mt-3">Registration Number : U70100MH2024PTC874590</p>
          <p className=" mt-3 text-[13px] opacity-50">
            All transactions involve market risks. Users are advised to perform
            due diligence.
          </p>
        </div>
        <div className="md:mt-10 md:ml-[251px]">
          <FloatingDockDemo />
        </div>
      </div>
      <div className="md:mt-20 mt-4 font-sf-pro">
        <img src={FooterImage} alt="Footer Image" />
        <div className="justify-between mt-2 md:flex md:px-40 text-sm font-light">
          <div>
            <p>Copyright2025@paxowealth.all rights reserved.</p>{" "}
          </div>
          <div className="md:flex hidden gap-10">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
