import { clearAuthData } from "@/utils/storage.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Refresh the access token
const refreshAccessToken = async () => {
  const REFRESH_TOKEN_URL = `${API_BASE_URL}/api/auth/refresh-token`;

  // Helper to handle the cleanup logic
  const handleAuthFailure = () => {
    clearAuthData();
    window.location.href = "/login";
  };

  try {
    const response = await fetch(REFRESH_TOKEN_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error('Token refresh failed with status:', response.status);
      handleAuthFailure();
      return null;
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    handleAuthFailure();
    return null;
  }
};

/**
 * Make API call with automatic token refresh on 401
 * @param {string} endpoint - API endpoint URL
 * @param {object} options - Fetch options
 * @param {boolean} retry - Whether to retry on 401
 * @param {boolean} requiresAuth - Whether endpoint requires authentication
 */
const apiCall = async (endpoint, options = {}, retry = true, requiresAuth) => {
  const token = localStorage.getItem("accessToken");

  const authHeaders =
    token && requiresAuth ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      ...authHeaders,
    },
  });

  // Handle both 401 (Unauthorized) and 403 (Forbidden) for token refresh
  // Some backends return 403 for expired tokens instead of 401
  if ((response.status === 401 || response.status === 403) && retry && requiresAuth) {
    const newToken = await refreshAccessToken();

    // If refresh failed, it already redirected to login, so abort retry
    if (!newToken) {
      throw new Error('Authentication failed - token refresh unsuccessful');
    }

    return apiCall(
      endpoint,
      {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      },
      false,
      requiresAuth
    );
  }

  return response;
};

// Make GET request
export const apiGet = async (endpoint, requiresAuth = true) => {
  const response = await apiCall(
    endpoint,
    { method: "GET", credentials: "include" },
    true, // Enable retry on 401
    requiresAuth
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

// Make POST request
export const apiPost = async (endpoint, formData, requiresAuth = true) => {
  const response = await apiCall(
    endpoint,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
    true, // Always enable retry on 401 for authenticated requests
    requiresAuth
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

// Make PUT request
export const apiPut = async (endpoint, formData, requiresAuth = true) => {
  const response = await apiCall(
    endpoint,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
    true,
    requiresAuth
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

// Make DELETE request
export const apiDelete = async (endpoint, requiresAuth = true) => {
  const response = await apiCall(
    endpoint,
    { method: "DELETE", credentials: "include" },
    true,
    requiresAuth
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};
