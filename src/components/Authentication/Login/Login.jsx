import React, { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../../ReduxConfig/authSlice";

function Login() {
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];

  const [formData, setFormData] = useState({
    mobileNumber: "",
    otp: ["", "", "", ""],
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState();
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
      case "mobileNumber":
        if (!value.trim()) return "Mobile number is required";
        if (!/^\d{10}$/.test(value))
          return "Mobile number must be exactly 10 digits";
        return "";

      case "otp":
        if (isOtpEnabled) {
          if (value.some((digit) => !digit)) return "Please enter complete OTP";
          if (!value.every((digit) => /^\d$/.test(digit)))
            return "OTP must contain only digits";
        }
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
      api: "", // Clear API errors on input change
    }));

    if (name === "mobileNumber") {
      // Only allow digits and limit to 10 characters
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    setFormData((prev) => {
      const newOtp = [...prev.otp];
      newOtp[index] = value;
      return { ...prev, otp: newOtp };
    });

    if (value && index < 3) {
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
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    const otpArray = pastedData
      .split("")
      .concat(Array(4 - pastedData.length).fill(""));
    setFormData((prev) => ({ ...prev, otp: otpArray }));
  };

  const handleSendOtp = async () => {
    setErrors({});
    setSuccessMessage("");

    const mobileError = validateField("mobileNumber", formData.mobileNumber);
    if (mobileError) {
      setErrors({ mobileNumber: mobileError });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/auth/login`, {
        phone: formData.mobileNumber,
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
        api: error.response?.data?.message || "Failed to send OTP",
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
        phone: formData.mobileNumber,
      });

      if (response.data) {
        setSuccessMessage("OTP resent successfully!");
        setResendTimer(30);
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Failed to resend OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleVerifyOtp = async () => {
  //   setErrors({});
  //   setSuccessMessage("");

  //   const otpError = validateField("otp", formData.otp);
  //   if (otpError) {
  //     setErrors({ otp: otpError });
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(`${apiURL}/auth/verify-otp`, {
  //       phone: formData.mobileNumber,
  //       otp: formData.otp.join(""),
  //     });

  //     if (response.data && response.data.token) {
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("name", response.data.name);
  //       dispatch(setAuth(response.data));
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     setErrors({
  //       api: error.response?.data?.message || "Invalid OTP",
  //       otp: "Incorrect OTP. Please try again.",
  //     });
  //     setFormData((prev) => ({ ...prev, otp: ["", "", "", ""] }));
  //     otpInputRefs[0].current?.focus();
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
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
      const response = await axios.post(`${apiURL}/auth/verify-otp`, {
        phone: formData.mobileNumber,
        otp: formData.otp.join(""),
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        dispatch(setAuth(response.data));
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Invalid OTP",
        otp: "Incorrect OTP. Please try again.",
      });
      setFormData((prev) => ({ ...prev, otp: ["", "", "", ""] }));
      otpInputRefs[0].current?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white min-h-screen py-5 font-sf-pro flex items-center justify-center">
      <div className="border border-gray-600 rounded-xl md:w-2/6 h-auto p-6">
        <h1 className="text-xl text-center text-customBlue font-meuthanies">
          PW
        </h1>
        <h1 className="text-black text-center font-meuthanies text-xl">
          Welcome to <span className="text-customBlue">Paxo Wealth</span>
        </h1>
  
        <div className="mt-6 xl:px-4 md:px-4">
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
  
            <div>
              <h1 className="text-black">Mobile Number*</h1>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={`bg-white text-black p-2 w-full mt-2 rounded border ${
                  errors.mobileNumber ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="10-digit mobile number"
                maxLength={10}
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>
  
            {isOtpEnabled && (
              <div className="mt-5 ">
                <h1 className="text-black">One Time Password</h1>
                <div className="flex xl:gap-16 gap-2 md:gap-6 justify-start mt-2">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      ref={otpInputRefs[index]}
                      type="text"
                      inputMode="numeric"
                      value={formData.otp[index]}
                      onChange={(e) =>
                        handleOtpChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className={`w-16 h-16 text-center border ${
                        errors.otp ? "border-red-500" : "border-gray-700"
                      } rounded focus:border-customGreen focus:ring-1 focus:ring-customGreen`}
                      maxLength={1}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1 text-center">
                    {errors.otp}
                  </p>
                )}
                <div className="mt-2 text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0 || isLoading}
                    className={`text-xs ${
                      resendTimer > 0
                        ? "text-gray-400"
                        : "text-customGreen hover:underline"
                    }`}
                  >
                    {resendTimer > 0
                      ? `Resend OTP in ${resendTimer}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}
  
            <button
              onClick={isOtpEnabled ? handleVerifyOtp : handleSendOtp}
              disabled={isLoading}
              className={`rounded-full bg-customGreen mt-5 w-48 p-2 mx-auto font-semibold 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer hover:bg-opacity-90"
                } block`}
            >
              <span className="text-center block">
                {isLoading
                  ? "Processing..."
                  : isOtpEnabled
                  ? "Verify"
                  : "Send OTP"}
              </span>
            </button>
  
            <p className="text-gray-600 text-center mt-2">Or</p>
            <button
              className="rounded-full border border-customGreen mt-2 justify-center items-center flex w-48 p-2 mx-auto text-black hover:bg-gray-50"
              type="button"
            >
              <FcGoogle />
              <span className="text-sm ml-2">SignIn with Google</span>
            </button>
  
            <p className="text-black text-[10px] text-center mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-customBlue hover:underline"
              >
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Login;
