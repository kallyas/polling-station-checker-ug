import axios from 'axios';

// Access environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_KEY = import.meta.env.VITE_API_KEY;

// Create a custom axios instance with better defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup request interceptor for API key and telemetry
apiClient.interceptors.request.use(
  (config) => {
    // Add API key to all requests if available
    if (API_KEY) {
      config.headers['Authorization'] = `Bearer ${API_KEY}`;
    }
    
    // Add timestamp for request telemetry
    config.metadata = { startTime: new Date().getTime() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling and telemetry
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const requestDuration = new Date().getTime() - response.config.metadata.startTime;
    console.debug(`Request to ${response.config.url} took ${requestDuration}ms`);
    
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject({
        status: "error",
        message: 'Unable to connect to the server. Please check your internet connection.',
        originalError: error
      });
    }
    
    // Handle API errors with status codes
    if (error.response.status === 401 || error.response.status === 403) {
      console.error('Authentication Error:', error.response.data);
      return Promise.reject({
        status: "error",
        message: 'Authentication failed. Please check your credentials.',
        originalError: error
      });
    }
    
    if (error.response.status === 404) {
      return Promise.reject({
        status: "error",
        message: 'No voter found with the provided ID.',
        originalError: error
      });
    }
    
    if (error.response.status >= 500) {
      console.error('Server Error:', error.response.data);
      return Promise.reject({
        status: "error",
        message: 'The server encountered an error. Please try again later.',
        originalError: error
      });
    }
    
    // Default error handling
    return Promise.reject(error);
  }
);

// Function to validate voter ID format
const isValidVoterId = (id) => {
  if (!id || typeof id !== 'string') return false;
  // Basic format validation (can be adjusted based on actual format requirements)
  return /^[A-Z0-9]{8,16}$/.test(id.trim());
};

// Main function to get voter details
export const getVoterDetails = async (voterId) => {
  // Input validation
  if (!voterId) {
    return { status: "error", message: "Voter ID is required." };
  }
  
  const formattedId = voterId.trim().toUpperCase();
  
  if (!isValidVoterId(formattedId)) {
    return { 
      status: "error", 
      message: "Invalid Voter ID format. Please enter a valid identification number." 
    };
  }

  if (!API_KEY && import.meta.env.PROD) {
    console.error("API Key is missing. Please set VITE_API_KEY in your .env file.");
    return { 
      status: "error", 
      message: "Application configuration error. Please contact support." 
    };
  }

  try {
    // Implement request caching to reduce API calls
    const cachedResult = sessionStorage.getItem(`voter_${formattedId}`);
    if (cachedResult) {
      try {
        const parsedResult = JSON.parse(cachedResult);
        // Add a flag to indicate it came from cache
        parsedResult.data.source = 'cache';
        return parsedResult;
      } catch (parseError) {
        // If parsing fails, proceed with API call
        console.warn('Cache parsing failed:', parseError);
      }
    }
    
    // Make API call
    const response = await apiClient.get(`/voter/${formattedId}`);
    
    // Cache successful responses
    if (response.data.status === "success") {
      sessionStorage.setItem(`voter_${formattedId}`, JSON.stringify(response.data));
    }
    
    return response.data;

  } catch (error) {
    // If error is already formatted by our interceptor
    if (error.status === "error") {
      return error;
    }
    
    console.error('API call failed:', error);
    
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data;
    } else if (error.code === 'ECONNABORTED') {
      return { status: "error", message: "The request timed out. Please try again." };
    } else if (error.request) {
      return { status: "error", message: "Could not connect to the server. Please check your network." };
    }
    
    return { 
      status: "error", 
      message: 'Failed to fetch voter details. Please try again later.' 
    };
  }
};