import React, { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const otpInputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    otp: ["", "", "", ""]
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full Name is required";
        if (!/^[a-zA-Z\s]*$/.test(value)) return "Name should only contain letters and spaces";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
        return "";

      case "mobileNumber":
        if (!value.trim()) return "Mobile number is required";
        if (!/^\d{10}$/.test(value)) return "Invalid mobile number";
        return "";

      case "otp":
        if (isOtpEnabled) {
          if (value.some(digit => !digit)) return "Please enter complete OTP";
          if (!value.every(digit => /^\d$/.test(digit))) return "OTP must contain only digits";
        }
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
      api: ""
    }));
    
    if (name === "mobileNumber") {
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else if (name === "fullName") {
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    setFormData(prev => {
      const newOtp = [...prev.otp];
      newOtp[index] = value;
      return { ...prev, otp: newOtp };
    });

    if (value && index < 5) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const otpArray = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
    setFormData(prev => ({ ...prev, otp: otpArray }));
  };

  const handleSendOtp = async () => {
    setErrors({});
    setSuccessMessage("");
    const newErrors = {};
    ["fullName", "email", "mobileNumber"].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/register`, {
        username: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.mobileNumber
      });
      
      if (response.data) {
        setIsOtpEnabled(true);
        setSuccessMessage(response.data.message || "OTP sent successfully!");
        setErrors({});
        setResendTimer(30);
        otpInputRefs[0].current?.focus();
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Registration failed"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/resend-otp`, {
        phone: formData.mobileNumber
      });
      
      if (response.data) {
        setSuccessMessage("OTP resent successfully!");
        setResendTimer(30);
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Failed to resend OTP"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrors({});
    setSuccessMessage("");
    const otpError = validateField("otp", formData.otp);
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/register-verify`, {
        phone: formData.mobileNumber,
        otp: formData.otp.join("")
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', formData.fullName.trim());
        navigate('/kyc');
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Invalid OTP",
        otp: "Incorrect OTP. Please try again."
      });
      setFormData(prev => ({ ...prev, otp: ["", "", "", "", "", ""] }));
      otpInputRefs[0].current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white mt-5 overflow-hidden font-sf-pro h-auto ">
      <div className="flex justify-center items-center h-full font-sf-pro">
        <div className="border border-gray-600 rounded-xl w-fullmd:w-[450px] md:h-5/6 p-6">
          <h1 className="text-xl text-center text-customBlue font-meuthanies">PW</h1>
          <h1 className="text-black text-center font-meuthanies text-xl">
            Welcome to <span className="text-customBlue">Paxo Wealth</span>
          </h1>
          
          <div className="mt-6 px-4">
            {successMessage && (
              <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 rounded-md p-3 mb-4 text-sm">
                {successMessage}
              </div>
            )}
            
            {errors.api && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded-md p-3 mb-4 text-sm">
                {errors.api}
              </div>
            )}

            <div>
              <div className="md:flex gap-4">
                <div className="flex-1">
                  <h1 className="text-black mt-4">Full Name*</h1>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`bg-white text-black p-2 w-full mt-2 rounded border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Full Name"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div className="flex-1">
                  <h1 className="text-black mt-4">Email ID*</h1>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-white text-black p-2 w-full mt-2 rounded border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Email ID"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="md:flex gap-4">
                <div className="flex-1">
                  <h1 className="text-black mt-4">Mobile Number*</h1>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`bg-white text-black p-2 w-full mt-2 rounded border ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Mobile Number"
                    maxLength={10}
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>
                {isOtpEnabled && (
                  <div className="flex-1">
                    <h1 className="text-black mt-4">One Time Password</h1>
                    <div className="flex gap-2 justify-between mt-2">
                      {[0, 1, 2, 3, ].map((index) => (
                        <input
                          key={index}
                          ref={otpInputRefs[index]}
                          type="text"
                          inputMode="numeric"
                          value={formData.otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={handleOtpPaste}
                          className={`w-8 h-8 text-center border ${
                            errors.otp ? 'border-red-500' : 'border-gray-700'
                          } rounded focus:border-customYellow focus:ring-1 focus:ring-customYellow`}
                          maxLength={1}
                        />
                      ))}
                    </div>
                    {errors.otp && <p className="text-red-500 text-xs mt-1 text-center">{errors.otp}</p>}
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendTimer > 0 || isLoading}
                        className={`text-xs ${
                          resendTimer > 0 ? 'text-gray-400' : 'text-customYellow hover:underline'
                        }`}
                      >
                        {resendTimer > 0 
                          ? `Resend OTP in ${resendTimer}s`
                          : "Resend OTP"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={isOtpEnabled ? handleVerifyOtp : handleSendOtp}
                disabled={isLoading}
                className={`rounded-full bg-customYellow mt-5 w-52 p-2 mx-auto font-semibold 
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-opacity-90'} block`}
              >
                <span className="text-center block">
                  {isLoading ? "Processing..." : (isOtpEnabled ? "Verify" : "Register")}
                </span>
              </button>

              <p className="text-gray-600 text-center mt-2">Or</p>
              <button 
                className="rounded-full border border-customYellow mt-2 justify-center items-center flex w-52 p-2 mx-auto text-black hover:bg-gray-50"
                type="button"
              >
                <FcGoogle />
                <span className="text-sm ml-2 font-semibold">Register with Google</span>
              </button>

              <p className="text-black text-[10px] text-center mt-4">
                Already have an account?{" "}
                <button
                  type="button" 
                  className="text-customYellow hover:underline"
                  onClick={() => navigate('/login')}
                >
                  SignIn
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;