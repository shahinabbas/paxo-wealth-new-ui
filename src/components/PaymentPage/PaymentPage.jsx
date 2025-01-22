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
import axios from "axios";

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
    monthlyEarnings: 0,
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
  const [profile, setProfile] = useState(null);

  // Calculate values based on property details and quantity
  const calculateValues = (property, quantity) => {
    const totalArea = quantity * property.minimum_sqft;
    const totalPrice =
      quantity * property.property_unit_price * property.minimum_sqft;
    const taxes = Math.ceil(totalPrice * 0.05); // 5% taxes
    const monthlyEarnings = property.capital_appreciation
      ? Math.ceil(((property.capital_appreciation / 100) * totalPrice) / 12)
      : 0;

    return { totalArea, totalPrice, taxes, monthlyEarnings };
  };

  // Initial data fetch
  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User is not authenticated. Please log in.");
          return;
        }

        // Fetch user profile
        const fetchedProfile = await fetchUserProfile(token);
        if (!fetchedProfile) {
          setError("Failed to fetch user profile.");
          return;
        }

        setProfile(fetchedProfile); // Update profile in state

        const storedData = sessionStorage.getItem("orderSummary");

        if (!storedData) {
          setError("No order data found");
          return;
        }

        const parsedData = JSON.parse(storedData);

        if (!parsedData || !parsedData.propertySlug || !parsedData.quantity) {
          setError("Invalid order data");
          return;
        }

        setOrderSummary(parsedData);
        await fetchPropertyDetails(
          parsedData.propertySlug,
          parsedData.quantity
        );
      } catch (err) {
        console.error("Initialization error:", err);
        setError("Failed to initialize payment page");
      }
    };

    init();
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${apiURL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return fetched profile data
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const fetchPropertyDetails = async (slug, quantity) => {
    try {
      const response = await axios.get(
        `${apiURL}/property/get-property-by-slug/${slug}`
      );
      const property = response.data?.property || response.data;

      if (!property) {
        throw new Error("Property data not found");
      }

      setPropertyDetails(property);
      const values = calculateValues(property, quantity);
      setCalculatedValues(values);
    } catch (error) {
      console.error("Error fetching property:", error);
      setError(
        error.response?.data?.message || "Failed to fetch property details"
      );
    } finally {
      setLoading(false);
    }
  };

  // Redirect if there's an error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
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
      formData.append("propertyId", propertyDetails._id);
      formData.append("units", orderSummary.quantity);
      formData.append("paymentMethod", paymentMethod);
      formData.append("paidAmount", amountPaid);
      formData.append("transactionId", transactionId);
      formData.append("paymentDate", paymentDate);

      // Append the file if it exists
      if (amountFile) {
        formData.append("paymentProof", amountFile);
      }

      const response = await axios.post(
        `${apiURL}/order/create-order`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
    <div className="min-h-screen bg-gray-50 text-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 mt-12">
        {/* Breadcrumb */}
        <div className="flex items-start">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <FaHome className="text-customBlue" />
            <span>Home</span>
            <FaArrowRight className="text-xs" />
            <span>BoostIncome</span>
            <FaArrowRight className="text-xs" />
            <span>Order Summary</span>
            <FaArrowRight className="text-xs" />
            <span className="text-customBlue">Payment</span>
          </div>
        </div>

        <h1 className="text-3xl text-center mb-8 font-meuthanies text-gray-900">
          Review Your Order Before Proceeding to Payment
        </h1>

        {/* Progress Steps */}
        <div className="md:flex justify-between items-center mb-12 hidden">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-customBlue rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-white" />
            </div>
            <div className="ml-2">
              <p className="text-sm text-customBlue">Explore</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-customBlue"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-customBlue rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-white" />
            </div>
            <div className="ml-2">
              <p className="text-sm text-customBlue">Order Summary</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-customBlue"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-customBlue rounded-full flex items-center justify-center">
              <span className="text-white">3</span>
            </div>
            <div className="ml-2">
              <p className="text-sm text-customBlue">Payment</p>
            </div>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white">4</span>
            </div>
            <div className="ml-2">
              <p className="text-sm text-gray-500">Confirmation</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Selected Opportunity */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Your Selected Opportunity
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Opportunity Name</p>
                  <p className="font-semibold text-gray-900">
                    {propertyDetails?.property_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="flex items-center text-gray-900">
                    <FaBuilding className="mr-2 text-customBlue" />
                    {propertyDetails?.property_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tenure</p>
                  <p className="font-semibold text-gray-900">18 months</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Annual Growth</p>
                  <p className="text-customBlue font-semibold">
                    {propertyDetails?.capital_appreciation}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Payout</p>
                  <p className="text-customBlue font-semibold flex items-center">
                    <MdCurrencyRupee />
                    {calculatedValues.monthlyEarnings}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Accordion */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => toggleAccordion(0)}
            >
              <h2 className="text-xl font-semibold text-gray-900">
                Your Profile Details
              </h2>
              <div className="text-customBlue">
                {openAccordion === 0 ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

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
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold text-gray-900">
                          {profile.username}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">
                          {profile.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">
                          {profile.phone}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link to="/dashboard/profile">
                        <button className="text-customBlue hover:text-blue-700 text-sm">
                          Update Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">
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
                  description: "Coming Soon - Pay instantly using any UPI app",
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
                      ? "cursor-pointer border-gray-200 hover:border-customBlue"
                      : "opacity-50 cursor-not-allowed border-gray-200"
                  } ${
                    paymentMethod === method.id
                      ? "border-customBlue bg-blue-50"
                      : ""
                  }`}
                  onClick={() => method.active && setPaymentMethod(method.id)}
                >
                  <div className="flex items-center">
                    <method.icon className="text-2xl text-customBlue mr-4" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        {!method.active && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Payment Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Opportunity Price</span>
                <span className="flex items-center text-gray-900">
                  <MdCurrencyRupee />
                  {calculatedValues.totalPrice}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxes and Fees (5%)</span>
                <span className="flex items-center text-gray-900">
                  <MdCurrencyRupee />
                  {calculatedValues.taxes}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-900">Total Payable Amount</span>
                  <span className="flex items-center text-lg text-gray-900">
                    <MdCurrencyRupee />
                    {calculatedValues.totalPrice + calculatedValues.taxes}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Payment Button */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <label className="flex items-start gap-2 cursor-pointer mb-6">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-gray-600">
                I have reviewed the details and agree to Paxo Wealth's Terms and
                Conditions. I confirm that the details provided are accurate and
                complete.
              </span>
            </label>
            <div className="flex gap-4">
              <button
                onClick={handlePaymentModal}
                disabled={!paymentMethod || !termsAccepted}
                className="flex-1 bg-customBlue hover:bg-blue-700 disabled:bg-gray-300 
                        disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-colors"
              >
                Proceed to Payment
              </button>
              <button
                className="flex-1 border border-customBlue hover:bg-blue-50 
                        text-customBlue py-3 rounded-lg font-bold"
              >
                Modify Order
              </button>
            </div>
          </div>

          {/* Payment Modal */}
          {isPaymentModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 md:p-0 p-5 flex justify-center items-center z-50">
              <div
                className={`bg-white rounded-lg p-6 ${
                  paymentStep === 1 ? "w-96 md:w-[600px]" : "w-96"
                } relative shadow-xl`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-500 text-2xl font-bold hover:text-gray-700"
                >
                  ×
                </button>

                {paymentStep === 1 && (
                  <div className="space-y-6 font-meuthanies">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Step 1: NEFT/RTGS Payment Instructions
                    </h2>

                    <div className="text-sm text-gray-600">
                      Please transfer the payment to the following account
                      details. Open your banking app or visit your bank to
                      complete the NEFT/RTGS payment:
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="space-y-3">
                        <div className="flex">
                          <span className="font-semibold w-1/2">
                            Account Name:
                          </span>
                          <span className="w-1/2">PAXO Wealth Pvt. Ltd.</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-1/2">
                            Account Number:
                          </span>
                          <span className="w-1/2">987654321012</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-1/2">
                            Bank Name:
                          </span>
                          <span className="w-1/2">HDFC Bank</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-1/2">
                            Branch Name:
                          </span>
                          <span className="w-1/2">Fort Branch, Mumbai</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-1/2">
                            IFSC Code:
                          </span>
                          <span className="w-1/2">HDFC0001234</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-1/2">
                            Account Type:
                          </span>
                          <span className="w-1/2">Current Account</span>
                        </div>
                        <div className="flex">
                          <span className="font-semibold w-1/2">
                            MICR Code:
                          </span>
                          <span className="w-1/2">400240003</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      Once the payment is made, proceed to the next step to
                      enter the transaction details for verification.
                    </div>

                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setPaymentStep(2)}
                        className="bg-customBlue text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                      >
                        Proceed to Enter Details
                      </button>
                    </div>
                  </div>
                )}

                {paymentStep === 2 && (
                  <>
                    <div
                      className="flex items-center text-gray-600 cursor-pointer mb-2"
                      onClick={() => setPaymentStep(1)}
                    >
                      <span className="text-2xl">
                        <IoIosArrowBack />
                      </span>
                      <span className="text-sm font-bold">Back</span>
                    </div>

                    <h2 className="text-gray-900 text-lg font-bold">
                      Step 2: Enter Payment Details
                    </h2>
                    {errorMessage && (
                      <div className="text-red-500 text-center mt-2 mb-2">
                        {errorMessage}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 mt-4">
                      <label className="text-sm text-gray-600">
                        Transaction ID (Mandatory)
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
                        />
                      </label>
                      <label className="text-sm text-gray-600">
                        Payment Date (Optional)
                        <input
                          type="date"
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                          className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
                        />
                      </label>
                      <label className="text-sm text-gray-600">
                        Amount Paid (Optional)
                        <input
                          type="text"
                          value={amountPaid}
                          onChange={(e) => setAmountPaid(e.target.value)}
                          className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
                        />
                      </label>
                      <label className="text-sm text-gray-600">
                        File Upload
                        <input
                          type="file"
                          onChange={(e) => setAmountFile(e.target.files[0])}
                          className="w-full mt-1 p-2 rounded border border-gray-300 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
                        />
                      </label>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        onClick={handleSubmitDetails}
                        className="bg-customBlue text-white py-2 px-8 rounded-lg font-bold hover:bg-blue-700"
                      >
                        Activate Plan
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Success Modal */}
          {isSuccessModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-6 w-96 relative overflow-hidden shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h2 className="text-gray-900 text-lg font-bold mb-4 relative z-10">
                  Payment Successful! Activate Your Plan
                </h2>
                <p className="text-gray-600 text-sm mb-4 relative z-10">
                  Thank you for completing your payment! Please follow the steps
                  below to finalize the activation of your plan:
                </p>

                <h1 className="text-customBlue text-sm font-bold mb-4 relative z-10">
                  Your plan will be activated once our team reviews and verifies
                  the details.
                </h1>

                <div className="flex justify-center mt-6 relative z-10">
                  <motion.button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="bg-customBlue hover:bg-blue-700 text-white py-2 px-8 rounded-lg font-bold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Go to Dashboard
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Security Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Safe and Secure Transactions
            </h2>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <FaShieldAlt className="text-customBlue mr-2" />
                <span className="text-sm text-gray-600">SSL Encrypted</span>
              </div>
              <div className="flex items-center">
                <FaLock className="text-customBlue mr-2" />
                <span className="text-sm text-gray-600">PCI DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Help & Support Footer */}
        <div className="mt-8 text-center text-gray-600">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <h3 className="font-semibold mb-4 text-gray-900">
              Need Assistance?
            </h3>
            <div className="space-y-2">
              <p>
                For payment-related queries, contact our support team at{" "}
                <a
                  href="mailto:support@paxowealth.com"
                  className="text-customBlue hover:text-blue-700"
                >
                  support@paxowealth.com
                </a>
              </p>
              <p>Available Monday to Saturday, 9 AM to 6 PM IST</p>
              <div className="flex justify-center gap-4 mt-4">
                <button className="text-customBlue hover:text-blue-700 flex items-center gap-2">
                  View Payment FAQs
                  <FaArrowRight className="text-xs" />
                </button>
                <button className="text-customBlue hover:text-blue-700 flex items-center gap-2">
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
