import { RefreshPromiseType } from "@/config/api/httpRequest/httpConfig";
import {
  ForgotPasswordResponse,
  LoginResponse,
  ResetPasswordResponse,
} from "@/constant/type";
import Cookies from "js-cookie"; // ← add this

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5500";

export async function register(payload: {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer" | "trainingProvider";
  companyName?: string | null;
  trainingProvider?: string | null;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  firstTimeLogin?: boolean;
}> {
  const res = await fetch(`${API_URL}/auth/register`, {
    // 👈 align with backend route
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, source: "USER" }), // 👈 keep parity with login
  });

  // Try to read JSON even on error so we can show a useful message
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // ignore parse errors
  }

  if (!res.ok) {
    throw new Error(json?.message || "Registration failed");
  }

  // Support envelope { err, message, data }
  if (typeof json?.err !== "undefined" && json.err !== 0) {
    throw new Error(json.message || "Registration failed");
  }

  const data = json?.data ?? json;
  const { accessToken, refreshToken, firstTimeLogin } = data;

  // Persist for your fetchRequest
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);

  return { accessToken, refreshToken, firstTimeLogin };
}

export async function login(
  email: string,
  password: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  firstTimeLogin: boolean;
}> {
  const data = {
    email,
    password,
    source: "USER",
  };
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const response: LoginResponse = await res.json();
  if (response.err !== 0) {
    throw new Error(response.message || "Login failed");
  }

  const { accessToken, refreshToken, firstTimeLogin } = response.data;

  // ✅ Persist tokens so fetchRequest can use them
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);

  return { accessToken, refreshToken, firstTimeLogin };
}

export async function refreshAccessToken(
  refreshToken: string
): RefreshPromiseType {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ← recommended
      "X-Refresh-Token": refreshToken,
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Token refresh failed");
  }

  const response = await res.json();
  if (response.err !== 0) {
    throw new Error(response.message || "Refresh failed");
  }

  // Optionally re-persist here so concurrent tabs stay in sync
  const { accessToken: newAccess, refreshToken: newRefresh } = response.data;
  Cookies.set("accessToken", newAccess);
  Cookies.set("refreshToken", newRefresh);

  return response.data;
}

export async function logout(refreshToken: string): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "X-Refresh-Token": refreshToken,
    },
  });

  // ✅ Clear cookies on client logout
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}

export async function forgotPassword(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Forgot password request failed");
  }

  const response: ForgotPasswordResponse = await res.json();
  if (response.err !== 0) {
    throw new Error(response.message || "Forgot password failed");
  }
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Temp-Token": token,
    },
    body: JSON.stringify({ newPassword }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Reset password failed");
  }

  const response: ResetPasswordResponse = await res.json();
  if (response.err !== 0) {
    throw new Error(response.message || "Reset failed");
  }
}
