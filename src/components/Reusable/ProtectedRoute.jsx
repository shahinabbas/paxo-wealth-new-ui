import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const kycStatus = localStorage.getItem("kycStatus");

  // Check if token doesn't exist
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (kycStatus !== "true") {
    return <Navigate to="/dashboard/profile" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;