"use client";

import axiosClient from "@/app/_lib/axiosClient";
import axios from "axios";
import { LogIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

// Define types for better type safety
interface LoginResponse {
  access_token: string;
  roles: string[];
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Email validation helper
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (email: string, password: string): FormErrors => {
    const formErrors: FormErrors = {};

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const email = emailRef.current?.value.trim() || "";
    const password = passwordRef.current?.value.trim() || "";

    // Validate form
    const formErrors = validateForm(email, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const { access_token, roles, user } = res.data;

      // Store data in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_roles", JSON.stringify(roles));
        localStorage.setItem("user_info", JSON.stringify(user));
      }

      console.log("Login successful:", res.data);

      // Navigate to dashboard
      router.push("/control-panel/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);

        if (error.response?.status === 401) {
          setErrors({ general: "Invalid email or password" });
        } else if (error.response?.status === 422) {
          setErrors({ general: "Please check your input and try again" });
        } else if (error.response?.status && error.response?.status >= 500) {
          setErrors({ general: "Server error. Please try again later" });
        } else {
          setErrors({
            general:
              error.response?.data?.message || "Login failed. Please try again",
          });
        }
      } else {
        console.error("Unexpected error:", error);
        setErrors({ general: "Something went wrong" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-dvh flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 px-6 py-8 rounded-lg shadow-lg border border-zinc-300 bg-white"
      >
        <div className="flex justify-center mb-4">
          <Image
            src="/ASALA DESIGN 1.png"
            alt="ASALA DESIGN"
            width={120}
            height={48}
            priority
          />
        </div>

        {/* General error message */}
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        {/* Email field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            placeholder="xyz@email.com"
            disabled={isLoading}
            className={`p-2 outline-none border rounded-md transition-colors ${
              errors.email
                ? "border-red-300 focus:border-red-500"
                : "border-zinc-300 focus:border-green-500"
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email}</span>
          )}
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            placeholder="Enter your password"
            disabled={isLoading}
            className={`p-2 outline-none border rounded-md transition-colors ${
              errors.password
                ? "border-red-300 focus:border-red-500"
                : "border-zinc-300 focus:border-green-500"
            } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
          {errors.password && (
            <span className="text-xs text-red-600">{errors.password}</span>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 p-3 rounded-md text-white font-medium transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-800 hover:bg-green-700 active:bg-green-900"
          }`}
        >
          <LogIn size={16} />
          <span>{isLoading ? "Signing in..." : "Login"}</span>
        </button>
      </form>
    </main>
  );
};

export default Login;
