import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/storage.js";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

ProtectedRoute.displayName = 'ProtectedRoute';

export default ProtectedRoute;
