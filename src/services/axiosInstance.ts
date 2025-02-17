import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Handle errors in response
    if (error.response) {
      // Response error (e.g., 400, 500)
      console.error("Response error:", error.response);
    } else if (error.request) {
      // Request error (e.g., network issues)
      console.error("Request error:", error.request);
    } else {
      // General error
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
