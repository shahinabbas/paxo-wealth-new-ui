// components/Dashboard/Dashboard.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Payouts from './Payouts';
import Profile from './Profile';
import Analytics from './Analytics';
import Opportunities from './Opportunities';
import Order from './Order';


const Dashboard = () => {
      useEffect(() => {
        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, []);
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Opportunities />} />
        <Route path="payouts" element={<Payouts />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;