import React from "react";
import { Link } from "react-router-dom";
import { MdPending } from "react-icons/md";

const KycNotificationBar = () => {
  const token = localStorage.getItem("token");
  const kycStatus = localStorage.getItem("kycStatus");
  const username = localStorage.getItem("name") || "User"; // Changed to 'name' to match navbar storage

  if (!token || kycStatus === "true") {
    return null;
  }

  return (
    <div className="fixed top-16 left-0 w-full z-50 bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-6 xl:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center gap-2">
            <MdPending className="w-5 h-5 text-yellow-600 animate-spin-fast" />
            <p className="text-sm text-yellow-700 font-sf-pro">
              <span className="font-medium mr-1"> Hi {username}:</span>
              Your KYC verification is under review
              <Link
                to="/kyc-tracking"
                className="ml-3 font-medium text-yellow-800 hover:text-yellow-900 underline inline-flex items-center gap-1"
              >
                Track Status
              </Link>
            </p>
          </div>
          <div className="font-medium text-yellow-700 text-sm font-sf-pro hidden sm:block">
            Thank you for your patience!
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycNotificationBar;
