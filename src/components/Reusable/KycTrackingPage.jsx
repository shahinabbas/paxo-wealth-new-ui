import React, { useEffect } from "react";
import { HiDocumentCheck, HiClipboardDocumentCheck } from "react-icons/hi2";
import { MdVerified, MdPending } from "react-icons/md";

const KycTrackingPage = () => {
  useEffect(() => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            KYC Status Tracking
          </h1>
          <p className="text-lg text-gray-600">
            Your KYC verification is under review
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div className="w-1/2 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Status Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Document Submitted */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <HiDocumentCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Documents Submitted
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                Successfully uploaded and received
              </p>
            </div>

            {/* Under Review */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 relative">
                <MdPending className="w-8 h-8 text-blue-600 animate-spin-fast" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Under Review
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                Being verified by our team
              </p>
            </div>

            {/* Pending Verification */}
            <div className="flex flex-col items-center opacity-50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <MdVerified className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Verification Complete
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                Final approval pending
              </p>
            </div>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Estimated Completion Time
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Usually takes 24-48 hours
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-lg font-medium text-blue-600">In Progress</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            We'll notify you once the verification is complete. Thank you for
            your patience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KycTrackingPage;
