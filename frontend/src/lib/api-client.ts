import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Pre-configured Axios instance for all FastAPI backend calls.
 *
 * Features:
 * - Auto-prefixes with /api/v1
 * - Sends cookies for auth
 * - Handles 401 redirects
 * - Request/response logging in development
 */
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ─── Request Interceptor ───────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Attach auth token from localStorage if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Dev logging
    if (process.env.NODE_ENV === "development") {
      console.log(`🌐 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ──────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Redirect to login on 401
      if (status === 401 && typeof window !== "undefined") {
        window.location.href = "/login";
      }

      // Log server errors
      if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
    } else if (error.request) {
      console.error("Network error: No response received");
    }

    return Promise.reject(error);
  }
);

// ─── Helper Functions ──────────────────────────────────────────

/** GET request */
export async function get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<T> {
  const response = await apiClient.get<T>(url, { params });
  return response.data;
}

/** POST request */
export async function post<T = unknown>(url: string, data?: unknown): Promise<T> {
  const response = await apiClient.post<T>(url, data);
  return response.data;
}

/** PUT request */
export async function put<T = unknown>(url: string, data?: unknown): Promise<T> {
  const response = await apiClient.put<T>(url, data);
  return response.data;
}

/** DELETE request */
export async function del<T = unknown>(url: string): Promise<T> {
  const response = await apiClient.delete<T>(url);
  return response.data;
}

/** Upload a file via multipart form data */
export async function uploadFile<T = unknown>(
  url: string,
  file: File,
  fieldName = "file"
): Promise<T> {
  const formData = new FormData();
  formData.append(fieldName, file);

  const response = await apiClient.post<T>(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000, // Longer timeout for uploads
  });
  return response.data;
}

export default apiClient;
