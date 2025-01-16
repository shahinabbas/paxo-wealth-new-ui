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
  const recentOrders = orders.slice(0, 3); // Get last 3 orders

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
  }, [ apiURL]);

  const handleDownloadReceipt = async (orderId) => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    try {
      const response = await axios.get(
        `${apiURL}/order/download-receipt/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="text-green-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customGreen"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Investment</p>
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <MdCurrencyRupee />
                  {/* {totalInvestment.toLocaleString()} */} 0
                </h3>
              </div>
              <FaChartLine className="text-3xl text-customGreen" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Properties</p>
                <h3 className="text-2xl font-bold text-white">
                  {orders.length}
                </h3>
              </div>
              <FaBuilding className="text-3xl text-customGreen" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Monthly Earnings</p>
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <MdCurrencyRupee />
                  {/* {(totalInvestment * 0.01).toLocaleString()} */} 0
                </h3>
              </div>
              <FaArrowUp className="text-3xl text-customGreen" />
            </div>
          </div>
        </div>

        {/* Recent Investments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">
              Recent Investments
            </h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {order.property?.property_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white flex items-center">
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
                            {getStatusIcon(order.status)}
                            <span className="ml-2 capitalize">
                              {order.orderStatus
                              }
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {order.orderStatus === "confirmed" && (
                            <button
                              onClick={() => handleDownloadReceipt(order._id)}
                              className="text-customGreen hover:text-green-600 transition-colors"
                            >
                              <FaDownload className="text-lg text-white" />
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
            <h2 className="text-xl font-bold text-white mb-4">
              Recent Activity
            </h2>
            <div className="bg-gray-800 rounded-lg p-4 space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-700"
                >
                  <div className="p-2 bg-gray-700 rounded-full">
                    <FaFileInvoice className="text-customGreen" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {order.property?.property_name}
                    </p>
                    <p className="text-sm text-gray-400">
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
                    <p className="text-customGreen font-medium flex items-center">
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
          <h2 className="text-xl font-bold text-white mb-4">All Orders</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          #{order._id.slice(-6)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {order.property?.property_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center">
                          <FaRupeeSign className="mr-1" />
                          {order.totalAmount?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`flex items-center text-sm ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          <span className="ml-2 capitalize">
                            {order.orderStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {order.orderStatus === "confirmed" && (
                          <button
                            onClick={() => handleDownloadReceipt(order._id)}
                            className="text-customGreen hover:text-green-600 transition-colors"
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
