import React, { useState } from "react";
import axios from "axios";
import Image from "/KYC.png";
import { useNavigate } from "react-router-dom";

function KYC() {
  const [formData, setFormData] = useState({
    fullName: "",
    adhaarNumber: "",
    panNumber: "",
  });
  const [files, setFiles] = useState({
    adhaarFile: null,
    panFile: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [filePreview, setFilePreview] = useState({
    adhaarFile: null,
    panFile: null,
  });

  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.adhaarNumber)
      newErrors.adhaarNumber = "Aadhar number is required";
    if (!formData.panNumber) newErrors.panNumber = "PAN number is required";
    if (!files.adhaarFile) newErrors.adhaarFile = "Aadhar file is required";
    if (!files.panFile) newErrors.panFile = "PAN file is required";

    // Check file sizes
    if (files.adhaarFile && files.adhaarFile.size > 300 * 1024) {
      newErrors.adhaarFile = "Aadhar file size should be less than 300KB";
    }
    if (files.panFile && files.panFile.size > 300 * 1024) {
      newErrors.panFile = "PAN file size should be less than 300KB";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 300 * 1024) {
        setErrors({
          ...errors,
          [type]: "File size should be less than 300KB",
        });
        e.target.value = "";
      } else {
        setFiles({
          ...files,
          [type]: file,
        });
        setFilePreview({
          ...filePreview,
          [type]: URL.createObjectURL(file),
        });
        if (errors[type]) {
          setErrors({
            ...errors,
            [type]: "",
          });
        }
      }
    }
  };

  const handleRemoveFile = (type) => {
    setFiles({
      ...files,
      [type]: null,
    });
    setFilePreview({
      ...filePreview,
      [type]: null,
    });

    const fileInput = document.getElementById(
      type === "adhaarFile" ? "adhaar-file" : "pan-file"
    );
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async () => {
    setErrors({});
    setSuccessMessage("");

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.fullName);
    formDataToSend.append("adhaarNumber", formData.adhaarNumber);
    formDataToSend.append("panNumber", formData.panNumber);
    formDataToSend.append("adhaarFile", files.adhaarFile);
    formDataToSend.append("panFile", files.panFile);

    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const response = await axios.put(`${apiURL}/auth/kyc`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setSuccessMessage("KYC details updated successfully!");

        // Clear formData and files
        setFormData({
          fullName: "",
          adhaarNumber: "",
          panNumber: "",
        });
        setFiles({
          adhaarFile: null,
          panFile: null,
        });
        navigate("/");
      }
    } catch (error) {
      setErrors({
        api: error.response?.data?.message || "Failed to update KYC details",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-black h-screen overflow-hidden font-sf-pro">
      <div className="absolute top-60 md:left-32 left-80 w-96 h-96 bg-blue-800 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute md:-top-20 md:left-[700px] -left-[200px] w-80 h-80 bg-emerald-900 rounded-full opacity-60 blur-3xl"></div>

      <div className="flex flex-col items-center justify-start h-full pt-20 p-5">
        <div className="border border-gray-600 rounded-xl flex p-6 w-full max-w-4xl">
          <div className="md:flex justify-center items-center w-[700px] hidden">
            <img
              src={Image}
              alt="KYC"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="w-full">
            <h1 className="text-xl text-center text-customGreen">PW</h1>
            <h1 className="text-white text-center text-xl font-meuthanies">
              KYC Verification
            </h1>

            {successMessage && (
              <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 rounded-md p-3 mt-4 text-sm">
                {successMessage}
              </div>
            )}

            {errors.api && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 rounded-md p-3 mt-4 text-sm">
                {errors.api}
              </div>
            )}

            <div className="mt-6 md:px-4">
              <div>
                <h1 className="text-white mt-4">Full Name*</h1>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                    errors.fullName ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Full Name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}

                <div className="md:flex gap-4">
                  <div className="flex-1">
                    <h1 className="text-white mt-4">Aadhar Number*</h1>
                    <input
                      type="text"
                      name="adhaarNumber"
                      value={formData.adhaarNumber}
                      onChange={handleChange}
                      className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                        errors.adhaarNumber
                          ? "border-red-500"
                          : "border-gray-700"
                      }`}
                      placeholder="Enter Aadhar Number"
                    />
                    {errors.adhaarNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.adhaarNumber}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-white mt-4">PAN Number*</h1>
                    <input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className={`bg-black text-white p-2 w-full mt-2 rounded border ${
                        errors.panNumber ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="Enter PAN Number"
                    />
                    {errors.panNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.panNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* File upload sections */}
                <div className="md:flex gap-4">
                  <div className="flex-1">
                    <div
                      className={`flex items-center bg-black text-white p-2 w-full mt-6 rounded border ${
                        errors.adhaarFile ? "border-red-500" : "border-gray-700"
                      }`}
                    >
                      <label
                        htmlFor="adhaar-file"
                        className="flex items-center cursor-pointer"
                      >
                        <span className="text-sm mr-6">
                          {files.adhaarFile
                            ? files.adhaarFile.name
                            : "Upload Aadhar card"}
                        </span>
                      </label>
                      <input
                        id="adhaar-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "adhaarFile")}
                        accept="image/*"
                      />
                      {files.adhaarFile && (
                        <button
                          onClick={() => handleRemoveFile("adhaarFile")}
                          className="ml-auto text-red-500"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    {filePreview.adhaarFile && (
                      <div className="mt-2 relative">
                        <img
                          src={filePreview.adhaarFile}
                          alt="Aadhar Preview"
                          className="w-full h-32 object-contain rounded border border-gray-700"
                        />
                      </div>
                    )}
                    {errors.adhaarFile && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.adhaarFile}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <div
                      className={`flex items-center bg-black text-white p-2 w-full mt-6 rounded border ${
                        errors.panFile ? "border-red-500" : "border-gray-700"
                      }`}
                    >
                      <label
                        htmlFor="pan-file"
                        className="flex items-center cursor-pointer"
                      >
                        <span className="text-sm mr-6">
                          {files.panFile
                            ? files.panFile.name
                            : "Upload PAN Card"}
                        </span>
                      </label>
                      <input
                        id="pan-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "panFile")}
                        accept="image/*"
                      />
                      {files.panFile && (
                        <button
                          onClick={() => handleRemoveFile("panFile")}
                          className="ml-auto text-red-500"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    {filePreview.panFile && (
                      <div className="mt-2">
                        <img
                          src={filePreview.panFile}
                          alt="PAN Preview"
                          className="w-full h-32 object-contain rounded border border-gray-700"
                        />
                      </div>
                    )}
                    {errors.panFile && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.panFile}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  className={`rounded-full bg-customGreen mt-5 w-52 p-2 mx-auto ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <h1 className="text-center">
                    {isLoading ? "Processing..." : "Verify"}
                  </h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KYC;
