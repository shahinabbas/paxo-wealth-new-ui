import React, { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa6";
import { MdQuestionAnswer, MdSupportAgent } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import emailjs from "emailjs-com";
import Swal from "sweetalert2"; // Import SweetAlert2

const ContactUs = () => {
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // To track form submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email with EmailJS
    emailjs
      .sendForm(
        "service_t4m1g8c", // Replace with your Service ID
        "template_3apip26", // Replace with your Template ID
        e.target,
        "Z1IJRrV_TWABu9IJG" // Replace with your User ID
      )
      .then(
        (result) => {
          Swal.fire({
            title: "Query Submitted!",
            text: "We are reviewing your message. Please wait...",
            icon: "success",
            confirmButtonColor: "#0056E0",
            confirmButtonText: "OK",
          });
          // setStatus("Message sent successfully!"); // Show success message
          setFormData({ name: "", email: "", message: "" }); // Clear state
        },
        (error) => {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      );
  };
  return (
    <div className="flex items-center mt-10 md:mt-0 justify-center min-h-screen  px-2 md:px-4 bg-white font-sf-pro">
      <section className="container mx-auto text-black mt-10">
        <div className="flex justify-center">
          <div className="text-center md:max-w-xl lg:max-w-3xl xl:max-w-4xl">
            <h2 className="mb-4 2xl:mb-14 px-6 text-3xl md:text-5xl 2xl:text-6xl font-meuthanies">
              Contact us
            </h2>
            <p className="mb-14 2xl:mb-36  2xl:text-2xl text-black opacity-50">
              We’re here to help you with any queries or support you need.
              Please feel free to reach out through any of the options below,
              and our team will assist you promptly.
            </p>
          </div>
        </div>

        <div className="md:flex xl:gap-20 gap-10">
          <form
            className="w-full p-6 bg-white sm:mb-10 rounded-lg md:px-8 lg:w-5/12 h-full min-h-[400px] md:min-h-[440px] lg:min-h-[450px]"
            style={{
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            }}
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <h1 className="mb-4 font-semibold text-xl xl:text-2xl">
                We Value Your Feedback{" "}
              </h1>
              <h1 className="xl:text-xl">
                Your input is important to us. Share your thoughts, suggestions,
                or concerns using the form below. We strive to ensure your
                experience with us is exceptional.
              </h1>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="nameInput"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="nameInput"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="emailInput"
              >
                Email
              </label>
              <input
                type="email"
                id="emailInput"
                name="email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {/* Message Input */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="messageInput"
              >
                Message
              </label>
              <textarea
                id="messageInput"
                name="message" // Name attribute required by EmailJS
                className="w-full h-28 px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send
            </button>
            
          </form>

          <div className="w-full  mt-10 md:mt-0 lg:w-6/12">
            <div className="xl:flex gap-20">
              <div className="xl:space-y-32">
                <div className="mb-12 w-full  md:w-full md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="">
                      <div className="inline-block rounded-md bg-teal-400-100 p-2 text-customBlue">
                        <MdSupportAgent className="size-7 md:size-10 xl:size-12" />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-semibold xl:text-2xl md:text-xl font-meuthanies">
                        Get in Touch
                      </p>
                      <p className="font-semibold">Technical support</p>
                      <p>Have a technical issue or need assistance?</p>
                      <p>
                        <strong className="mr-2">Email:</strong>
                        <a href="mailto:support@paxowealth.com">
                          support@paxowealth.com
                        </a>
                      </p>
                      {/* <p>
                        <strong>Phone:</strong> +1 234-567-89
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full  md:w-full md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-teal-400-100 p-2 text-customBlue">
                        <MdQuestionAnswer className="size-7 md:size-10 xl:size-12" />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-semibold xl:text-2xl md:text-xl font-meuthanies">
                        Information & General Queries
                      </p>
                      <p className="mb-2">
                        Looking for general information or details about our
                        services?
                      </p>
                      <p className=" ">
                        <strong>Email:</strong>{" "}
                        <a href="mailto:info@paxowealth.com">
                          info@paxowealth.com
                        </a>
                      </p>
                      {/* <p className="">
                        <strong>Phone:</strong> +1 234-567-89
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:space-y-32">
                <div className="mb-12 w-full  md:w-full md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-teal-400-100 p-2 text-customBlue">
                        <FaClipboardQuestion className="size-7 md:size-10 xl:size-12" />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold xl:text-2xl md:text-xl font-meuthanies">
                        Sales questions
                      </p>
                      <p className="mb-2 ">
                        Interested in our products or services? Our sales team
                        is here to guide you.
                      </p>
                      <p className="">
                        <strong>Email: </strong>
                        <a href="mailto:sales@paxowealth.com">
                          sales@paxowealth.com
                        </a>
                      </p>
                      {/* <p className="">
                        <strong>Phone: </strong>+1 234-567-89
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="mb-12 w-full  md:w-full md:px-3 lg:px-6">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="rounded-md  p-2 text-customBlue">
                        <FaAddressCard className="size-7 md:size-10 xl:size-12" />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-semibold xl:text-2xl md:text-xl font-meuthanies">
                        Contact
                      </p>
                      <p className="text-black opacity-70">
                        PAXO Wealth NESCO IT Park, Building 4, North Wing,
                        Western Express Hwy, Goregaon, Mumbai, Maharashtra
                        400063
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
