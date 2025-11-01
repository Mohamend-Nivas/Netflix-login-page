import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import InputField from "../components/InputField";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email.trim())
      newErrors.email = "Please enter a valid email address or mobile number.";
    if (!password.trim())
      newErrors.password =
        "Your password must contain between 4 and 60 characters.";
    if (!remember) newErrors.remember = "Please check Remember Me to continue!";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrors({ general: data.message });
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Something went wrong. Please try again!" });
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }
  };

  return (
    <div
      className="
        relative flex items-center justify-center min-h-screen
        bg-black sm:bg-[url('/src/assets/landing.jpg')] bg-cover bg-center
      "
    >
      {/* Overlay (desktop) */}
      <div className="absolute inset-0 bg-black bg-opacity-60 hidden sm:block"></div>

      {/* Netflix Logo (desktop) */}
      <div className="hidden sm:block absolute top-6 left-6 sm:left-12 z-20">
        <img
          src="/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className="w-36 sm:w-44 drop-shadow-[2px_2px_6px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Login Box */}
      <div
        className="
          relative z-10 text-white 
          w-full max-w-md 
          bg-black bg-opacity-75 rounded-md 
          sm:bg-opacity-75 sm:rounded-md 
          max-sm:bg-black max-sm:w-full max-sm:h-screen max-sm:rounded-none
          flex flex-col justify-center
          py-12 px-8 sm:px-16
        "
      >
        {/* Netflix Logo (mobile) */}
        <div className="block sm:hidden w-full text-center mb-6">
          <img
            src="/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            className="w-28 mx-auto mb-14"
          />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-left">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Email */}
          <div>
            <InputField
              type="text"
              placeholder="Email or mobile number"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              error={!!errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <InputField
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              icon={showPassword ? EyeOffIcon : EyeIcon}
              onIconClick={() => setShowPassword(!showPassword)}
              error={!!errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded mt-2"
          >
            Sign In
          </button>
        </form>

        {/* OR Line */}
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-600 flex-grow mr-2"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="border-t border-gray-600 flex-grow ml-2"></div>
        </div>

        <button className="w-full bg-gray-700 text-white font-semibold py-2 rounded hover:bg-gray-600">
          Use a sign-in code
        </button>

        {/* Forgot Password + Remember Me */}
        <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
          <a
            href="#"
            className="hover:underline text-gray-400 hover:text-slate-300 font-medium"
          >
            Forgot password?
          </a>
          <label className="flex items-center space-x-2 font-medium">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => {
                setRemember(!remember);
                clearError("remember");
              }}
            />
            <span>Remember me</span>
          </label>
        </div>

        {errors.remember && (
          <p className="text-red-500 text-xs mt-1 text-right">
            {errors.remember}
          </p>
        )}

        <p className="text-gray-500 text-xs mt-6">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="text-blue-400 underline">
            Learn more.
          </a>
        </p>
      </div>
    </div>
  );
}
