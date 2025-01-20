import React, { useEffect, useState, useRef } from "react";
import { FaEdit, FaSave, FaFileAlt, FaEye, FaPlus } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const apiImg = process.env.REACT_APP_API_HOST;
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    kyc: {
      adhaarNumber: "",
      panNumber: "",
      adhaarFile: "",
      panFile: "",
    },
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      bankName: "",
    },
    isKycVerified: false,
  });

  const [editStates, setEditStates] = useState({
    personal: false,
    kyc: false,
    bank: false,
  });

  const [isLoading, setIsLoading] = useState({
    fetch: false,
    personal: false,
    kyc: false,
    bank: false,
  });

  const [previewFile, setPreviewFile] = useState(null);

  // File input refs
  const adhaarFileRef = useRef(null);
  const panFileRef = useRef(null);
  const profileImageRef = useRef(null);

  // Form state for file uploads
  const [selectedFiles, setSelectedFiles] = useState({
    adhaarFile: null,
    panFile: null,
    profileImage: null,
  });

  useEffect(() => {
    fetchUserData();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchUserData = async () => {
    setIsLoading((prev) => ({ ...prev, fetch: true }));
    try {
      const response = await axios.get(`${apiURL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUserData(response.data);
      localStorage.setItem("name", response?.data?.username);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handlePersonalInfoUpdate = async () => {
    setIsLoading((prev) => ({ ...prev, personal: true }));
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);

      if (selectedFiles.profileImage) {
        formData.append("user_img", selectedFiles.profileImage);
      }

      const response = await axios.put(`${apiURL}/auth/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setEditStates((prev) => ({ ...prev, personal: false }));
      setSelectedFiles((prev) => ({ ...prev, profileImage: null }));
    } catch (error) {
      console.error("Failed to update personal info:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, personal: false }));
    }
  };

  const handleKycUpdate = async () => {
    setIsLoading((prev) => ({ ...prev, kyc: true }));
    try {
      const formData = new FormData();
      formData.append("adhaarNumber", userData.kyc.adhaarNumber);
      formData.append("panNumber", userData.kyc.panNumber);
      formData.append("username", userData.username);

      if (selectedFiles.adhaarFile) {
        formData.append("adhaarFile", selectedFiles.adhaarFile);
      }
      if (selectedFiles.panFile) {
        formData.append("panFile", selectedFiles.panFile);
      }

      const response = await axios.put(`${apiURL}/auth/kyc`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });


      setEditStates((prev) => ({ ...prev, kyc: false }));
      setSelectedFiles((prev) => ({
        ...prev,
        adhaarFile: null,
        panFile: null,
      }));
      fetchUserData()
    } catch (error) {
      console.error("Failed to update KYC details:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, kyc: false }));
    }
  };

  const handleBankDetailsUpdate = async () => {
    setIsLoading((prev) => ({ ...prev, bank: true }));
    try {
      const response = await axios.put(
        `${apiURL}/auth/bank-details`,
        {
          accountNumber: userData.bankDetails.accountNumber,
          ifscCode: userData.bankDetails.ifscCode,
          bankName: userData.bankDetails.bankName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditStates((prev) => ({ ...prev, bank: false }));
      fetchUserData()
    } catch (error) {
      console.error("Failed to update bank details:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, bank: false }));
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section === "personal") {
      setUserData((prev) => ({ ...prev, [field]: value }));
    } else if (section === "kyc") {
      setUserData((prev) => ({
        ...prev,
        kyc: { ...prev.kyc, [field]: value },
      }));
    } else if (section === "bank") {
      setUserData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [field]: value },
      }));
    }
  };

  const handleFileChange = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleFilePreview = (fileUrl) => {
    setPreviewFile(fileUrl);
  };

  if (isLoading.fetch) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
<div className="max-w-2xl mx-auto space-y-6 font-sf-pro">
      <h2 className="text-3xl font-bold mb-8 font-meuthanies text-gray-900">Profile</h2>

      {/* Personal Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold font-meuthanies text-gray-900">
            Personal Information
          </h3>
          <button
            onClick={() =>
              setEditStates((prev) => ({ ...prev, personal: !prev.personal }))
            }
            className="text-gray-500 hover:text-customBlue"
          >
            <FaEdit size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.username}
              onChange={(e) =>
                handleInputChange("personal", "username", e.target.value)
              }
              disabled={!editStates.personal}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.email}
              onChange={(e) =>
                handleInputChange("personal", "email", e.target.value)
              }
              disabled={!editStates.personal}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.phone}
              onChange={(e) =>
                handleInputChange("personal", "phone", e.target.value)
              }
              disabled={!editStates.personal}
            />
          </div>
          {editStates.personal && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  ref={profileImageRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange("profileImage", e)}
                />
                <button
                  onClick={() => profileImageRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Choose Profile Image
                </button>
                {selectedFiles.profileImage && (
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedFiles.profileImage.name}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handlePersonalInfoUpdate}
                  disabled={isLoading.personal}
                  className="flex items-center px-6 py-2 bg-customBlue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
                >
                  {isLoading.personal ? (
                    "Processing..."
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* KYC Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold font-meuthanies text-gray-900">
            KYC Details
            {userData.isKycVerified && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            )}
          </h3>
          <button
            onClick={() =>
              setEditStates((prev) => ({ ...prev, kyc: !prev.kyc }))
            }
            className="text-gray-500 hover:text-customBlue"
          >
            {userData.kyc?.adhaarNumber ? (
              <FaEdit size={20} />
            ) : (
              <FaPlus size={20} />
            )}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.kyc?.adhaarNumber || ""}
              onChange={(e) =>
                handleInputChange("kyc", "adhaarNumber", e.target.value)
              }
              disabled={!editStates.kyc}
            />
          </div>
          {(userData.kyc?.adhaarFile || editStates.kyc) && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Aadhaar Document
              </label>
              {editStates.kyc && (
                <>
                  <input
                    type="file"
                    ref={adhaarFileRef}
                    className="hidden"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange("adhaarFile", e)}
                  />
                  <button
                    onClick={() => adhaarFileRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Choose Aadhaar File
                  </button>
                  {selectedFiles.adhaarFile && (
                    <span className="ml-2 text-sm text-gray-600">
                      {selectedFiles.adhaarFile.name}
                    </span>
                  )}
                </>
              )}
              {userData.kyc?.adhaarFile && !editStates.kyc && (
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <FaFileAlt className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">Aadhaar Document</span>
                  </div>
                  <button
                    onClick={() =>
                      handleFilePreview(
                        `${apiImg}/${userData.kyc.adhaarFile.replace(
                          /\\/g,
                          "/"
                        )}`
                      )
                    }
                    className="text-customBlue hover:text-blue-700"
                  >
                    <FaEye size={20} />
                  </button>
                </div>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              PAN Number
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.kyc?.panNumber || ""}
              onChange={(e) =>
                handleInputChange("kyc", "panNumber", e.target.value)
              }
              disabled={!editStates.kyc}
            />
          </div>
          {(userData.kyc?.panFile || editStates.kyc) && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                PAN Document
              </label>
              {editStates.kyc && (
                <>
                  <input
                    type="file"
                    ref={panFileRef}
                    className="hidden"
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileChange("panFile", e)}
                  />
                  <button
                    onClick={() => panFileRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Choose PAN File
                  </button>
                  {selectedFiles.panFile && (
                    <span className="ml-2 text-sm text-gray-600">
                      {selectedFiles.panFile.name}
                    </span>
                  )}
                </>
              )}
              {userData.kyc?.panFile && !editStates.kyc && (
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <FaFileAlt className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">PAN Document</span>
                  </div>
                  <button
                    onClick={() =>
                      handleFilePreview(
                        `${apiImg}/${userData.kyc.panFile.replace(/\\/g, "/")}`
                      )
                    }
                    className="text-customBlue hover:text-blue-700"
                  >
                    <FaEye size={20} />
                  </button>
                </div>
              )}
            </div>
          )}
          {editStates.kyc && (
            <div className="flex justify-end">
              <button
                onClick={handleKycUpdate}
                disabled={isLoading.kyc}
                className="flex items-center px-6 py-2 bg-customBlue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                {isLoading.kyc ? (
                  "Processing..."
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save KYC Details
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bank Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold font-meuthanies text-gray-900">
            Bank Account Details
          </h3>
          <button
            onClick={() =>
              setEditStates((prev) => ({ ...prev, bank: !prev.bank }))
            }
            className="text-gray-500 hover:text-customBlue"
          >
            {userData.bankDetails?.accountNumber ? (
              <FaEdit size={20} />
            ) : (
              <FaPlus size={20} />
            )}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Account Number
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.bankDetails?.accountNumber}
              onChange={(e) =>
                handleInputChange("bank", "accountNumber", e.target.value)
              }
              disabled={!editStates.bank}
              placeholder={
                editStates.bank
                  ? "Enter account number"
                  : "No account number added"
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.bankDetails?.ifscCode || ""}
              onChange={(e) =>
                handleInputChange("bank", "ifscCode", e.target.value)
              }
              disabled={!editStates.bank}
              placeholder={
                editStates.bank ? "Enter IFSC code" : "No IFSC code added"
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:border-customBlue focus:ring-1 focus:ring-customBlue"
              value={userData.bankDetails?.bankName || ""}
              onChange={(e) =>
                handleInputChange("bank", "bankName", e.target.value)
              }
              disabled={!editStates.bank}
              placeholder={
                editStates.bank ? "Enter bank name" : "No bank name added"
              }
            />
          </div>
          {editStates.bank && (
            <div className="flex justify-end">
              <button
                onClick={handleBankDetailsUpdate}
                disabled={isLoading.bank}
                className="flex items-center px-6 py-2 bg-customBlue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                {isLoading.bank ? (
                  "Processing..."
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save Bank Details
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setPreviewFile(null)}
                className="text-gray-600 hover:text-customBlue"
              >
                Close
              </button>
            </div>
            {previewFile.endsWith(".pdf") ? (
              <iframe
                src={previewFile}
                className="w-full h-[80vh]"
                title="Document Preview"
              />
            ) : (
              <img
                src={previewFile}
                alt="Document Preview"
                className="max-w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
