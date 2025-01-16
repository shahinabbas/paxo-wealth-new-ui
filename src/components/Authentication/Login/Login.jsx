import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const validatePhone = () => {
    if (!mobileNumber.trim()) {
      setErrors({ phone: "Mobile number is required" });
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setErrors({ phone: "Invalid mobile number format" });
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    setErrors({});
    setSuccessMessage("");
    
    if (!validatePhone()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/login`, { phone: mobileNumber });
      if (response.data) {
        setIsOtpEnabled(true);
        setSuccessMessage(response.data.message || "OTP sent successfully!");
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Failed to send OTP"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrors({});
    setSuccessMessage("");
    
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/verify-otp`, { 
        phone: mobileNumber, 
        otp 
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        navigate('/');
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Invalid OTP"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-black h-screen overflow-hidden font-sf-pro">
      <div className="absolute top-60 md:left-32 left-60 w-96 h-96 bg-blue-800 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute md:-top-20 md:left-[700px] -left-[120px] w-80 h-80 bg-emerald-900 rounded-full opacity-60 blur-3xl"></div>

      <div className="flex justify-center items-center h-full">
        <div className="border border-gray-600 rounded-xl md:w-2/6 md:h-5/6 p-6">
          <h1 className="text-xl text-center text-customGreen font-meuthanies">PW</h1>
          <h1 className="text-white text-center font-meuthanies text-xl">
            Welcome to <span className="text-customGreen">Paxo Wealth</span>
          </h1>
          <div className="mt-6 px-4">
            <div>
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

              <h1 className="text-white">Mobile Number</h1>
              <input
                type="text"
                className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                  errors.phone ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  if (errors.phone) setErrors({});
                }}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
              
              <h1 className="text-white mt-4">One Time Password</h1>
              <input
                type="text"
                className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                  errors.otp ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (errors.otp) setErrors({});
                }}
                disabled={!isOtpEnabled}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
              )}

              <div 
                className="rounded-full bg-customGreen mt-5 w-48 p-2 mx-auto cursor-pointer"
                onClick={isOtpEnabled ? handleVerifyOtp : handleSendOtp}
              >
                <h1 className="text-center">
                  {isLoading ? "Processing..." : (isOtpEnabled ? "Verify" : "Send OTP")}
                </h1>
              </div>

              <p className="text-gray-600 text-center mt-2">Or</p>
              <div className="rounded-full border border-customGreen mt-2 justify-center items-center flex w-48 p-2 mx-auto text-white">
                <FcGoogle />
                <h1 className="text-center text-sm ml-2 text-white">
                  SignIn with Google
                </h1>
              </div>
              
              <p className="text-white text-[10px] text-center mt-4">
                Don't have an account?
                <Link to="/signup" className="text-customGreen ml-1">
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;