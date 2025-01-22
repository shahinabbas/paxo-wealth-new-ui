import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import Properties from "./components/Properties/Properties";
import FaqCombined from "./components/Faq/FaqCombined";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import Login from "./components/Authentication/Login/Login";
import SignUp from "./components/Authentication/Signup/SignUp";
import "./App.css";
import KYC from "./components/Authentication/KYC/KYC";
import BoostIncome from "./components/Home/BoostIncome";
import BoostIncomePage from "./components/InnerPages/BoostIncome/BoostIncomePage";
import OpportunitiesPage from "./components/InnerPages/OpportunitiesPage.jsx/OpportunitiesPage";
import Boost from "./components/InnerPages/BoostIncome/Boost";
import PropertyDetail from "./components/PropertyDetail/PropertyDetail";
import PaymentPage from "./components/PaymentPage/PaymentPage";
import Dashboard from "./components/Dashboard/Dashboard";
import About from "./components/About/About";
import ContactUs from "./components/Contact/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Terms from "./components/Terms/Terms";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import Blog from "./components/Blog/Blog";
import HowItWork from "./components/HowItWorks/HowItWork";
import RentRise from "./components/InnerPages/RentRise/RentRise";
import DirectSave from "./components/InnerPages/DirectSave/DirectSave";
import Earnings from "./components/Earnings/Earnings";
import { Provider } from "react-redux";
import store from "./components/ReduxConfig/store";
import ProtectedRoute from "./components/Reusable/ProtectedRoute";
import BoostIncomePropertiesHome from "./components/InnerPages/BoostIncome/BoostIncomeproperties/BoostIncomePropertiesHome";
import KycNotificationBar from "./components/Reusable/KycNotificationBar";
import KycTrackingPage from "./components/Reusable/KycTrackingPage";

function App() {
  return (
    <Router>
      <AppWithNavigation />
    </Router>
  );
}

function AppWithNavigation() {
  const location = useLocation(); // This should now be inside the Router context
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/kyc"; // Check if the route is login or signup
  const token = localStorage.getItem("token");
  const kycStatus = localStorage.getItem("kycStatus");
  const isDashboard = location.pathname.startsWith("/dashboard");
  const shouldShowNotification = !isAuthPage && token && kycStatus !== "true";
  return (
    <Provider store={store}>
      {/* Conditionally render Navbar and Footer */}
      <div
        className={`min-h-screen ${shouldShowNotification ? "pt-28" : "pt-16"}`}
      >
        {!isAuthPage && <Navbar />}

        {shouldShowNotification && <KycNotificationBar />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kyc-tracking" element={<KycTrackingPage />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/faq" element={<FaqCombined />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/boost-income" element={<BoostIncomePage />} />
          <Route
            path="/boost-income/properties"
            element={<BoostIncomePropertiesHome />}
          />
          <Route path="/boost" element={<Boost />} />
          {/* <Route path="/rent-rise" element={<RentRise />} /> */}
          <Route path="/rent-rise" element={<ComingSoon />} />
          <Route path="/direct-save" element={<DirectSave />} />
          <Route
            path="/property-detail/:slug"
            element={
              <ProtectedRoute>
                <PropertyDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-page"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/how-it-works" element={<HowItWork />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        {/* Conditionally render Footer */}
        {!isAuthPage && !isDashboard && <Footer />}
      </div>
    </Provider>
  );
}

export default App;
