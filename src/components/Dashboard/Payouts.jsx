import React, { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { FaCheckCircle, FaChartLine } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6"
import axios from "axios";

const Payouts = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const [payoutData, setPayoutData] = useState({
    nextPayout: null,
    totalPaidAmount: "0",
    totalPendingAmount: "0"
  });
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch summary data
        const summaryResponse = await axios.get(
          `${apiURL}/payout/payout-summary`,
          config
        );
        
        setPayoutData({
          nextPayout: summaryResponse.data.data.nextPayout,
          totalPaidAmount: summaryResponse.data.data.totalPaidAmount,
          totalPendingAmount: summaryResponse.data.data.totalPendingAmount
        });

        // Fetch payout history with pagination
        const historyResponse = await axios.get(
          `${apiURL}/payout/payout-history?page=${currentPage}&limit=10`,
          config
        );

        setPayoutHistory(historyResponse.data.data.payments);
        setTotalPages(historyResponse.data.data.pagination.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading payout data: {error}
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const EmptyStateMessage = () => (
    <div className="text-center py-12">
      <div className="flex justify-center items-center space-x-2 mb-6">
        <div className="animate-bounce">
          <FaChartLine className="w-8 h-8 text-blue-500" />
        </div>
        <div className="animate-pulse delay-75">
          <MdCurrencyRupee className="w-10 h-10 text-green-500" />
        </div>
        <div className="animate-bounce delay-150">
          <FaHandHoldingDollar className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Payout History Available
      </h3>
      <p className="text-gray-600">
        You haven't started any investment yet. Start investing to view your payout history.
      </p>
    </div>
  );

  return (
    <div className="space-y-6 font-sf-pro">
      <h2 className="text-3xl font-bold mb-8 font-meuthanies text-gray-900">
        Payouts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Payout Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 mb-2">Next Payout</p>
          <div className="flex items-center text-2xl font-bold text-blue-600">
            <MdCurrencyRupee />
            <span>{payoutData.nextPayout ? formatCurrency(payoutData.nextPayout.estimatedAmount) : '0.00'}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Due on {payoutData.nextPayout ? formatDate(payoutData.nextPayout.dueDate) : 'N/A'}
          </p>
        </div>

        {/* Total Earned Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 mb-2">Total Earned</p>
          <div className="flex items-center text-2xl font-bold text-gray-900">
            <MdCurrencyRupee />
            <span>{formatCurrency(payoutData.totalPaidAmount)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Total paid amount</p>
        </div>

        {/* Pending Payouts Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-600 mb-2">Pending Payouts</p>
          <div className="flex items-center text-2xl font-bold text-gray-900">
            <MdCurrencyRupee />
            <span>{formatCurrency(payoutData.totalPendingAmount)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Remaining payments</p>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Payout History
          </h3>
          
          {payoutHistory.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600 border-b border-gray-200">
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Property</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payoutHistory.map((payout, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 text-gray-900">
                          {formatDate(payout.paymentDate)}
                        </td>
                        <td className="py-4 text-gray-900">
                          {payout.propertyTitle}
                        </td>
                        <td className="py-4 flex items-center text-gray-900">
                          <MdCurrencyRupee />
                          {formatCurrency(payout.paidAmount)}
                        </td>
                        <td className="py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                            <FaCheckCircle className="mr-1" /> Completed
                          </span>
                        </td>
                        <td className="py-4 text-gray-600">
                          {payout.transactionId || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyStateMessage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payouts;