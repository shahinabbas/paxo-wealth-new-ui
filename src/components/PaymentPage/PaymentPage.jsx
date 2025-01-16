import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaCreditCard,
  FaUniversity,
  FaShieldAlt,
  FaLock,
  FaExclamationTriangle,
  FaMobile,
  FaArrowRight,
  FaBuilding,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios"

const PaymentPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [orderSummary, setOrderSummary] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [calculatedValues, setCalculatedValues] = useState({
    totalArea: 0,
    totalPrice: 0,
    taxes: 0,
    monthlyEarnings: 0
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // UI state
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [amountFile, setAmountFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);
  const [paymentStep, setPaymentStep] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate values based on property details and quantity
  const calculateValues = (property, quantity) => {
    const totalArea = quantity * 100;
    const totalPrice = quantity * property.property_unit_price * 100;
    const taxes = Math.ceil(totalPrice * 0.05); // 5% taxes
    const monthlyEarnings = property.capital_appreciation ? 
      Math.ceil(((property.capital_appreciation / 100) * totalPrice) / 12) : 0;

    return { totalArea, totalPrice, taxes, monthlyEarnings };
  };

  // Initial data fetch
  useEffect(() => {
    const init = async () => {
      try {
        const storedData = sessionStorage.getItem('orderSummary');
        
        if (!storedData) {
          setError('No order data found');
          return;
        }

        const parsedData = JSON.parse(storedData);
        
        if (!parsedData || !parsedData.propertySlug || !parsedData.quantity) {
          setError('Invalid order data');
          return;
        }

        setOrderSummary(parsedData);
        await fetchPropertyDetails(parsedData.propertySlug, parsedData.quantity);
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to initialize payment page');
      }
    };

    init();
  }, []);

  const fetchPropertyDetails = async (slug, quantity) => {
    try {
      const response = await axios.get(`${apiURL}/property/get-property-by-slug/${slug}`);
      const property = response.data?.property || response.data;
      
      if (!property) {
        throw new Error('Property data not found');
      }

      setPropertyDetails(property);
      const values = calculateValues(property, quantity);
      setCalculatedValues(values);
    } catch (error) {
      console.error("Error fetching property:", error);
      setError(error.response?.data?.message || "Failed to fetch property details");
    } finally {
      setLoading(false);
    }
  };


  // Redirect if there's an error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  const handlePaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleSubmitDetails = async () => {
    
    if (!transactionId) {
      setErrorMessage("Transaction ID is mandatory.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please log in.");
    }
  
    try {
      const formData = new FormData();
      formData.append('propertyId', propertyDetails._id);
      formData.append('units', orderSummary.quantity);
      formData.append('paymentMethod', paymentMethod);
      formData.append('paidAmount', amountPaid);
      formData.append('transactionId', transactionId);
      formData.append('paymentDate', paymentDate);
      
      // Append the file if it exists
      if (amountFile) {
        formData.append('paymentProof', amountFile);
      }
  
      const response = await axios.post(`${apiURL}/order/create-order`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.data.success === "ok") {
        setErrorMessage("");
        setIsModalOpen(false);
        setIsPaymentModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error creating order");
      console.log(error.message);
      
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };



  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-gray-400">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  if (!orderSummary) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customGreen"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-3xl mx-auto px-4 mt-12">
        {/* Breadcrumb */}
        <div className="flex justify-start items-start">
          {" "}
          {/* Changed from center to start */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <FaHome className="text-customGreen" />
            <span>Home</span>
            <FaArrowRight className="text-xs" />
            <span>BoostIncome</span>
            <FaArrowRight className="text-xs" />
            <span>Order Summary</span>
            <FaArrowRight className="text-xs" />
            <span className="text-customGreen">Payment</span>
          </div>
        </div>

        <h1 className="text-3xl  text-center mb-8 font-meuthanies">
          Review Your Order Before Proceeding to Payment
        </h1>

        {/* Progress Steps */}
        <div className="md:flex justify-between items-center mb-12 hidden  ">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-customGreen rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-white" />
            </div>
            <div className="ml-2">
              <p className="text-sm text-customGreen">Explore</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-customGreen"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-customGreen rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-white" />
            </div>
            <div className="ml-2">
              <p className="text-sm text-customGreen">Order Summary</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-customGreen"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-customGreen rounded-full flex items-center justify-center">
              <span className="text-white">3</span>
            </div>
            <div className="ml-2">
              <p className="text-sm text-customGreen">Payment</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-gray-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white">4</span>
            </div>
            <div className="ml-2">
              <p className="text-sm text-gray-400">Confirmation</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Selected Opportunity */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
              Your Selected Opportunity
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Opportunity Name</p>
                  <p className="font-semibold">{propertyDetails?.property_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="flex items-center">
                    <FaBuilding className="mr-2 text-customGreen" />
                    {propertyDetails?.property_type}
                  </p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="flex items-center">
                    <FaLocationDot className="mr-2 text-customGreen" />
                    {orderDetails.location}
                  </p>
                </div> */}
                <div>
                  <p className="text-sm text-gray-400">Tenure</p>
                  <p className="font-semibold">18 months</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Annual Growth</p>
                  <p className="text-customGreen font-semibold">
                  {propertyDetails?.capital_appreciation}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Monthly Payout</p>
                  <p className="text-customGreen font-semibold flex items-center">
                    <MdCurrencyRupee />
                    {calculatedValues.monthlyEarnings}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            {/* Header */}
            <div
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleAccordion(0)}
            >
              <h2 className="text-xl font-semibold text-white">
                Your Profile Details
              </h2>
              <div className="text-customGreen hover:text-customGreen">
                {openAccordion === 0 ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {/* Content with Framer Motion */}
            <AnimatePresence>
              {openAccordion === 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="font-semibold text-white">
                          {userDetails.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-semibold text-white">
                          {userDetails.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="font-semibold text-white">
                          {userDetails.phone}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link to="/dashboard/profile">
                        <button className="text-customGreen hover:text-customGreen text-sm">
                          Update Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gray-800 rounded-lg p-6">
            {/* Header */}
            <div
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleAccordion(1)}
            >
              <h2 className="text-xl font-meuthanies text-white">
                Payment Instructions
              </h2>
              <div className="text-customGreen hover:text-customGreen">
                {openAccordion === 1 ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {/* Content with Framer Motion */}
            <AnimatePresence>
              {openAccordion === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-800 rounded-lg">
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-200">
                        Activate Your Plan After Successful Payment
                      </h3>
                      <p className="text-gray-400 mt-2">
                        Thank you for making the payment! Please follow the
                        steps below to activate your plan:
                      </p>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="text-gray-300 font-semibold">
                            Step 1: Log In to Your Dashboard
                          </h4>
                          <p className="text-gray-400">
                            Visit the Dashboard Login Page and enter your
                            credentials to log in securely.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-gray-300 font-semibold">
                            Step 2: Submit Transaction Details
                          </h4>
                          <p className="text-gray-400">
                            Navigate to the "Payment Verification" section on
                            your dashboard. Enter the Transaction ID received
                            after your NEFT/RTGS payment. Double-check the
                            details and click "Submit."
                          </p>
                        </div>
                        <div>
                          <h4 className="text-gray-300 font-semibold">
                            Step 3: Activate Your Plan
                          </h4>
                          <p className="text-gray-400">
                            Once your payment is verified, go to the "My Plans"
                            section. Select your desired plan and click
                            "Activate Plan." A confirmation message will appear,
                            and your plan will be activated immediately.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Support Section */}
                    <div className="mt-8 text-center">
                      <p className="text-sm text-gray-400">
                        Need Help? If you face any issues, contact our support
                        team at{" "}
                        <a
                          href="mailto:support@example.com"
                          className="text-blue-400 hover:underline"
                        >
                          support@example.com
                        </a>{" "}
                        or call us at{" "}
                        <span className="text-blue-400">
                          [Your Support Number]
                        </span>{" "}
                        for assistance.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-4 text-center">
                      <a
                        href="/dashboard"
                        className="py-3  mb-10 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Go to Dashboard and Activate Plan
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          

            {/* Content with Framer Motion */}
           
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-meuthanies text-white mb-8">
                      {" "}
                      Choose Your Payment Method
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          id: "neft",
                          name: "NEFT/IMPS Transfer",
                          icon: FaUniversity,
                          description:
                            "Account details provided for direct bank transfer",
                          active: true,
                        },
                        {
                          id: "upi",
                          name: "UPI Payments",
                          icon: FaMobile,
                          description:
                            "Coming Soon - Pay instantly using any UPI app",
                          active: false,
                        },
                        {
                          id: "card",
                          name: "Credit/Debit Card",
                          icon: FaCreditCard,
                          description: "Coming Soon - Secure card payments",
                          active: false,
                        },
                      ].map((method) => (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-4 ${
                            method.active
                              ? "cursor-pointer border-gray-700 hover:border-customGreen"
                              : "opacity-50 cursor-not-allowed border-gray-700"
                          } ${
                            paymentMethod === method.id
                              ? "border-customGreen bg-gray-700"
                              : ""
                          }`}
                          onClick={() =>
                            method.active && setPaymentMethod(method.id)
                          }
                        >
                          <div className="flex items-center">
                            <method.icon className="text-2xl text-customGreen mr-4" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{method.name}</h3>
                                {!method.active && (
                                  <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">
                                    Coming Soon
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400">
                                {method.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
        

          {/* Payment Summary */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Opportunity Price</span>
                <span className="flex items-center">
                  <MdCurrencyRupee />
                  {calculatedValues.totalPrice}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Taxes and Fees (5%)</span>
                <span className="flex items-center">
                  <MdCurrencyRupee />
                  {calculatedValues.taxes}
                </span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Payable Amount</span>
                  <span className="flex items-center text-lg">
                    <MdCurrencyRupee />
                    {calculatedValues.totalPrice + calculatedValues.taxes}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Payment Button */}
          <div className="bg-gray-800 rounded-lg p-6">
            <label className="flex items-start gap-2 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-gray-400">
                I have reviewed the details and agree to Paxo Wealth's Terms and
                Conditions. I confirm that the details provided are accurate and
                complete.
              </span>
            </label>
            <div className="flex gap-4">
              <button
                onClick={handlePaymentModal}
                disabled={!paymentMethod || !termsAccepted}
                className="flex-1 bg-customGreen hover:bg-green-600 disabled:bg-gray-600 
                            disabled:cursor-not-allowed text-black py-3 rounded-lg font-bold transition-colors"
              >
                Proceed to Payment
              </button>
              <button
                className="flex-1 border border-customGreen hover:bg-customGreen/10 
                            text-white py-3 rounded-lg font-bold"
              >
                Modify Order
              </button>
            </div>
          </div>
          {isPaymentModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 md:p-0 p-5 flex justify-center items-center">
              <div
                className={`bg-gray-900 rounded-lg p-6 ${
                  paymentStep === 1 ? "w-96 md:w-[600px]" : "w-96"
                } relative`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="absolute top-2 right-2 text-white text-2xl font-bold"
                >
                  ×
                </button>

                {paymentStep === 1 && (
                  <>
                    <h2 className="text-white text-lg font-bold mb-4">
                      Step 1: NEFT/RTGS Payment Instructions
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">
                      Please transfer the payment to the following account
                      details. Open your banking app or visit your bank to
                      complete the NEFT/RTGS payment:
                    </p>

                    <div className="bg-gray-800 p-4 rounded-lg text-sm text-white space-y-2">
                      <p>
                        <span className="font-semibold">Account Name:</span>{" "}
                        [Your Company Name]
                      </p>
                      <p>
                        <span className="font-semibold">Account Number:</span>{" "}
                        [Your Account Number]
                      </p>
                      <p>
                        <span className="font-semibold">Bank Name:</span> [Bank
                        Name]
                      </p>
                      <p>
                        <span className="font-semibold">Branch Name:</span>{" "}
                        [Branch Name]
                      </p>
                      <p>
                        <span className="font-semibold">IFSC Code:</span> [Bank
                        IFSC Code]
                      </p>
                    </div>

                    <p className="text-sm text-gray-400 mt-4">
                      Once the payment is made, proceed to the next step to
                      enter the transaction details for verification.
                    </p>

                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => setPaymentStep(2)} // Navigate to Step 2
                        className="bg-customGreen  text-black py-2 px-8 rounded-lg font-bold"
                      >
                        Proceed to Enter Details
                      </button>
                    </div>
                  </>
                )}

                {paymentStep === 2 && (
                  <>
                    {/* Back Icon with Text */}
                    <div
                      className="flex items-center text-gray-400 cursor-pointer mb-2"
                      onClick={() => setPaymentStep(1)} // Go back to Step 1
                    >
                      <span className="text-2xl ">
                        <IoIosArrowBack />
                      </span>
                      <span className="text-sm font-bold">Back</span>
                    </div>

                    <h2 className="text-white text-lg font-bold ">
                      Step 2: Enter Payment Details
                    </h2>
                    {errorMessage && (
                      <div className="text-red-500 text-center mt-2 mb-2">
                        {errorMessage}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 ">
                      <div className="flex"></div>
                      <label className="text-sm text-gray-400">
                        Transaction ID (Mandatory)
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                        />
                      </label>
                      <label className="text-sm text-gray-400">
                        Payment Date (Optional)
                        <input
                          type="date"
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                          className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                        />
                      </label>
                      <label className="text-sm text-gray-400">
                        Amount Paid (Optional)
                        <input
                          type="text"
                          value={amountPaid}
                          onChange={(e) => setAmountPaid(e.target.value)}
                          className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                        />
                      </label>
                      <label className="text-sm text-gray-400">
                       File
                        <input
                          type="file"
                          
                          onChange={(e) => setAmountFile(e.target.files[0])}
                          className="w-full mt-1 p-2 rounded bg-gray-800 text-white"
                        />
                      </label>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handleSubmitDetails}
                        className="bg-customGreen text-black py-2 px-8 rounded-lg font-bold"
                      >
                        Activate Plan
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {isSuccessModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 rounded-lg p-6 w-96 relative overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                {/* Glitter Effects */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 60%)",
                    backgroundSize: "300% 300%",
                    zIndex: 1,
                  }}
                />

                <h2 className="text-white text-lg font-bold mb-4 relative z-10">
                  Payment Successful! Activate Your Plan
                </h2>
                <p className="text-white text-sm mb-4 relative z-10">
                  Thank you for completing your payment! Please follow the steps
                  below to finalize the activation of your plan:
                </p>

                <h1 className="text-yellow-400 text-sm font-bold mb-4 relative z-10">
                  Your plan will be activated once our team reviews and verifies
                  the details.
                </h1>

                <div className="flex justify-center mt-6 relative z-10">
                  <motion.button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-lg font-bold shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Dashboard
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Security Section */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Safe and Secure Transactions
            </h2>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <FaShieldAlt className="text-customGreen mr-2" />
                <span className="text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center">
                <FaLock className="text-customGreen mr-2" />
                <span className="text-sm">PCI DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status Modals */}
        {paymentStatus && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
              {paymentStatus === "success" ? (
                <div className="text-center">
                  <FaCheckCircle className="text-customGreen text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for activating this opportunity. Your receipt has
                    been sent to your registered email.
                  </p>
                  <button
                    className="bg-customGreen hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <FaExclamationTriangle className="text-red-400 text-5xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    Payment Unsuccessful
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Something went wrong. Please try again or contact support.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      className="bg-customGreen hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold"
                      onClick={() => setPaymentStatus(null)}
                    >
                      Retry Payment
                    </button>
                    <button
                      className="border border-customGreen hover:bg-customGreen/10 text-white py-3 px-6 rounded-lg font-bold"
                      onClick={() =>
                        (window.location.href = "mailto:support@paxowealth.com")
                      }
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help & Support Footer */}
        <div className="mt-8 text-center text-gray-400">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Need Assistance?</h3>
            <div className="space-y-2">
              <p>
                For payment-related queries, contact our support team at{" "}
                <a
                  href="mailto:support@paxowealth.com"
                  className="text-customGreen hover:text-customGreen"
                >
                  support@paxowealth.com
                </a>
              </p>
              <p>Available Monday to Saturday, 9 AM to 6 PM IST</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="text-customGreen hover:text-customGreen flex items-center gap-2"
                  onClick={() => {
                    /* Handle FAQ click */
                  }}
                >
                  View Payment FAQs
                  <FaArrowRight className="text-xs" />
                </button>
                <button
                  className="text-customGreen hover:text-customGreen flex items-center gap-2"
                  onClick={() => {
                    /* Handle Help click */
                  }}
                >
                  Help Center
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
