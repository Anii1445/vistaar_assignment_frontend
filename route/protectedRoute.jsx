import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? <Navigate to="/dashboard" /> : children;
}

export default ProtectedRoute;
