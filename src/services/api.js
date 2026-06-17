import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,  // ← critical: tells axios to send cookies
                            // without this, browser strips cookies from requests
});

// Track whether a refresh is in progress
// This prevents multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue = [];

// Process the queue of failed requests after token refresh
const processQueue = (error, token = null) => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });
    failedQueue = [];
}

// Response interceptor — handles token expiry automatically
api.interceptors.response.use(
    // Success — just return the response
    (response) => response,

    // Error — check if it's a token expiry
    async (error) => {
        const originalRequest = error.config;

        const isTokenExpired = (
            error.response?.status === 401 &&
            error.response?.data?.code === "token_expired" &&
            !originalRequest._retry     // prevent infinite retry loop
        );

        if (isTokenExpired) {
            // Mark this request so we don't retry it again
            originalRequest._retry = true;

            if (isRefreshing) {
                // Another refresh is already in progress
                // Queue this request to retry after refresh completes
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                    }).then(() => {
                        // Retry the original request
                        return api(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                });
            }

            isRefreshing = true;

            try {
                // Attempt to refresh tokens
                // The refresh cookie is sent automatically
                await api.post("accounts/refresh/");

                // Refresh succeeded — process queued requests
                processQueue(null);

                // Retry the original request
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed — user must log in again
                processQueue(refreshError, null);

                // Clear user state and redirect to login
                // We import the store/context to do this
                window.dispatchEvent(new CustomEvent('auth:logout'));

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Not a token error — reject normally
        return Promise.reject(error);
    }
);

export default api;