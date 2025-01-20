import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaDownload,
  FaArrowUp,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaFileInvoice,
  FaChartLine,
  FaCalendarAlt,
  FaBuilding,
  FaRupeeSign,
} from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;

  // Calculate total investment and recent activities
  const totalInvestment = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );
  const recentOrders = orders.slice(0, 3);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiURL}/order/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [apiURL]);

  // const handleDownloadReceipt = async (orderId) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     throw new Error("No token found. Please log in.");
  //   }
  //   try {
  //     const response = await axios.get(
  //       `${apiURL}/order/download-receipt/${orderId}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         responseType: "blob",
  //       }
  //     );

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `receipt-${orderId}.pdf`);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading receipt:", error);
  //   }
  // };
  const handleDownloadReceipt = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token not found");

      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/order/download-order-paymentslip/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Important for handling PDF data
        }
      );

      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", 'receipt-${orderId}.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // toast({
      //   title: "Success",
      //   description: "Receipt downloaded successfully",
      // });
    } catch (err) {
      console.error("Download error:", err);
      // setError(err.response?.data?.message || "Error downloading receipt");

      // toast({
      //   variant: "destructive",
      //   title: "Download Failed",
      //   description: err.response?.data?.message || "Error downloading receipt",
      // });
    } finally {
      setLoading(false);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-customBlue";
      case "pending":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="text-customBlue" />;
      case "pending":
        return <FaClock className="text-yellow-600" />;
      case "rejected":
        return <FaTimesCircle className="text-red-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customBlue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Investment</p>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MdCurrencyRupee />
                  {/* {totalInvestment.toLocaleString()} */} 0
                </h3>
              </div>
              <FaChartLine className="text-3xl text-customBlue" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Properties</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {orders.length}
                </h3>
              </div>
              <FaBuilding className="text-3xl text-customBlue" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Monthly Earnings</p>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <MdCurrencyRupee />
                  {/* {(totalInvestment * 0.01).toLocaleString()} */} 0
                </h3>
              </div>
              <FaArrowUp className="text-3xl text-customBlue" />
            </div>
          </div>
        </div>

        {/* Recent Investments and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Investments
            </h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.property?.property_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FaRupeeSign className="mr-1" />
                            {order.totalAmount?.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`flex items-center text-sm ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {getStatusIcon(order.orderStatus)}
                            <span className="ml-2 capitalize">
                              {order.orderStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {order.orderStatus === "confirmed" && (
                            <button
                              onClick={() => handleDownloadReceipt(order._id)}
                              className="text-customBlue hover:text-blue-700 transition-colors"
                            >
                              <FaDownload className="text-lg" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="bg-white rounded-lg p-4 space-y-4 shadow-lg border border-gray-200">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="p-2 bg-blue-50 rounded-full">
                    <FaFileInvoice className="text-customBlue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">
                      {order.property?.property_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.status === "confirmed"
                        ? "Investment Successful"
                        : "Payment Processing"}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-customBlue font-medium flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {order.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Orders */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Orders</h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          #{order._id.slice(-6)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.property?.property_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaRupeeSign className="mr-1" />
                          {order.totalAmount?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`flex items-center text-sm ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          <span className="ml-2 capitalize">
                            {order.orderStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {order.orderStatus === "confirmed" && (
                          <button
                            onClick={() => handleDownloadReceipt(order._id)}
                            className="text-customBlue hover:text-blue-700 transition-colors"
                          >
                            <FaDownload className="text-lg" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;