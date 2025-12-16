// Save user authentication data to localStorage
export const saveAuthData = (accessToken, email, role) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("email", email);
  localStorage.setItem("role", role);
};


// Get user authentication data from localStorage
export const getAuthData = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  };
};


// Clear all authentication data
export const clearAuthData = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
};


// Check if user is logged in
export const isAuthenticated = () => {
  return localStorage.getItem("accessToken") !== null;
};