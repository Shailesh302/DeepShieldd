// Central API configuration
// Uses Vite env variable if set (local dev), otherwise falls back to the deployed Render backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://deepshieldd-backend.onrender.com/api';

export default API_BASE_URL;
