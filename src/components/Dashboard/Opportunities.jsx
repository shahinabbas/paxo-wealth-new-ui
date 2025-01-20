import React, { useEffect, useState } from "react";
import StatCard from "../Reusable/StatCard";
import PropertyCard from "../Reusable/PropertyCard";
import axios from "axios";

const Opportunities = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiURL = process.env.REACT_APP_API_URL;
  const userName = localStorage.getItem("name");

  // Calculate totals from actual orders
  const calculateTotals = () => {
    return orders.reduce((acc, order) => {
      return {
        totalInvested: acc.totalInvested + Number(order.totalAmount || 0),
        monthlyEarnings: acc.monthlyEarnings + Number(order.priceDetails?.monthlyEarnings || 0),
        currentValue: acc.currentValue + (Number(order.totalAmount || 0) * 
          (1 + (Number(order.priceDetails?.capitalAppreciation?.replace('%', '') || 0) / 100)))
      };
    }, { totalInvested: 0, monthlyEarnings: 0, currentValue: 0 });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiURL}/order/my-confirm-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.orders);
        
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-customGreen"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  const { totalInvested, currentValue, monthlyEarnings } = calculateTotals();

  return (
    <div className="space-y-6 font-sf-pro">
      <h2 className="text-3xl font-bold mb-8 font-meuthanies text-gray-900">Portfolio</h2>
      <h1>
        Welcome,{" "}
        <span className="font-bold text-[18px] text-black">
          {userName}
        </span>{" "}
        Here's a snapshot of your Paxo Wealth portfolio.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Invested" value={totalInvested} />
        <StatCard label="Current Value" value={currentValue} isGreen />
        <StatCard label="Monthly Earnings" value={monthlyEarnings} isGreen />
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <PropertyCard 
            key={order._id} 
            property={{
              id: order._id,
              name: order.property?.property_name || 'Property Name',
              type: order.property?.property_type || 'Property Type',
              investedAmount: Number(order.totalAmount),
              currentValue: Number(order.totalAmount) * 
                (1 + (Number(order.priceDetails?.capitalAppreciation?.replace('%', '') || 0) / 100)),
              monthlyPayout: Number(order.priceDetails?.monthlyEarnings),
              nextPayout: new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ).toISOString().split('T')[0],
              growth: Number(order.priceDetails?.capitalAppreciation?.replace('%', '') || 0),
              priceDetails: order.priceDetails,
              paymentStatus: order.paymentStatus,
              orderStatus: order.orderStatus,
              units: order.units
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Opportunities;