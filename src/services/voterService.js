import axios from 'axios';

// Access environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_KEY = import.meta.env.VITE_API_KEY; // VITE_ prefix for Vite projects

// --- SECURITY WARNING ---
// EXPOSING API KEYS DIRECTLY IN THE FRONTEND IS A MAJOR SECURITY RISK.
// This key (VITE_API_KEY) will be bundled with your client-side code and visible.
// For a production application:
// 1. Your frontend should make requests to YOUR OWN backend server.
// 2. Your backend server should then securely make requests to the target API (localhost:3000)
//    using the API key, which is stored safely on the server.
// This setup is for local development/demonstration ONLY.
// --- END SECURITY WARNING ---

if (!API_KEY && import.meta.env.PROD) { // Or simply !API_KEY if you always expect it
  console.error(
    "CRITICAL SECURITY WARNING: API_KEY is not defined in environment variables. This is insecure for production."
  );
  // You might want to throw an error or disable API calls in production if the key isn't found,
  // though ideally the key isn't even part of the frontend build in production.
}


export const getVoterDetails = async (voterId) => {
  if (!voterId) {
    // This should ideally be caught by form validation first
    return { status: "error", message: "Voter ID is required." };
  }

  if (!API_KEY) {
      console.error("API Key is missing. Please set VITE_API_KEY in your .env file.");
      return { status: "error", message: "Application configuration error. Cannot contact server."};
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/voter/${voterId.trim()}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000, // Optional: 10 second timeout
    });
    // The API seems to return the full response body for both success and its own error messages
    return response.data; // Expects {status: "success", data: {...}} or {status: "error", message: "..."}

  } catch (error) {
    console.error('API call failed:', error);
    if (error.response && error.response.data && error.response.data.message) {
      // If the API returns a JSON error response like {"status":"error","message":"No voter found..."}
      return error.response.data;
    } else if (error.code === 'ECONNABORTED') {
      return { status: "error", message: "The request timed out. Please try again." };
    } else if (error.request) {
        // The request was made but no response was received
        return { status: "error", message: "Could not connect to the server. Please check your network." };
    }
    // Other types of errors (e.g., setup issues, network down before request sent)
    return { status: "error", message: 'Failed to fetch voter details due to an unexpected issue. Please try again later.' };
  }
};