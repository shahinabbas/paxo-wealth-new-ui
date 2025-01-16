import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "", email: "", mobileNumber: "", otp: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSendOtp = async () => {
    setErrors({});
    setSuccessMessage("");
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/register`, {
        username: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber
      });
      
      if (response.data) {
        setIsOtpEnabled(true);
        setSuccessMessage(response.data.message || "Registration successful! Please verify OTP.");
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Registration failed"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrors({});
    setSuccessMessage("");
    if (!formData.otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/register-verify`, {
        phone: formData.mobileNumber,
        otp: formData.otp
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', formData.fullName);
        navigate('/kyc');
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
      <div className="absolute top-60 md:left-32 left-80 w-96 h-96 bg-blue-800 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute md:-top-20 md:left-[700px] -left-[200px] w-80 h-80 bg-emerald-900 rounded-full opacity-60 blur-3xl"></div>
      
      <div className="flex justify-center items-center h-full font-mono">
        <div className="border border-gray-600 rounded-xl md:w-[450px] md:h-5/6 p-6">
          <h1 className="text-xl text-center text-customGreen font-meuthanies">PW</h1>
          <h1 className="text-white text-center font-meuthanies text-xl">
            Welcome to <span className="text-customGreen">Paxo Wealth</span>
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
                  <h1 className="text-white mt-4">Full Name*</h1>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Full Name"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div className="flex-1">
                  <h1 className="text-white mt-4">Email ID*</h1>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Email ID"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="md:flex gap-4">
                <div className="flex-1">
                  <h1 className="text-white mt-4">Mobile Number</h1>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Mobile Number"
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>
                <div className="flex-1">
                  <h1 className="text-white mt-4">One Time Password</h1>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    disabled={!isOtpEnabled}
                    className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                      errors.otp ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="Enter OTP"
                  />
                  {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                </div>
              </div>

              <div 
                className="rounded-full bg-customGreen mt-5 w-52 p-2 mx-auto cursor-pointer"
                onClick={isOtpEnabled ? handleVerifyOtp : handleSendOtp}
              >
                <h1 className="text-center">
                  {isLoading ? "Processing..." : (isOtpEnabled ? "Verify" : "Register")}
                </h1>
              </div>

              <p className="text-gray-600 text-center mt-2">Or</p>
              <div className="rounded-full border border-customGreen mt-2 justify-center items-center flex w-52 p-2 mx-auto text-white">
                <FcGoogle />
                <h1 className="text-center text-sm ml-2 text-white">
                  Register with Google
                </h1>
              </div>

              <p className="text-white text-[10px] text-center mt-4">
                Already have an account?
                <span 
                  className="text-customGreen cursor-pointer" 
                  onClick={() => navigate('/login')}
                > SignIn</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;