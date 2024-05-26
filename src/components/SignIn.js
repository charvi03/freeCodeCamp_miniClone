import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function SignIn({ setIsLoggedIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        name,
        email,
        password,
      });
      console.log(response.data);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/courses");
    } catch (error) {
      console.error(
        "Error during sign up:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response && error.response.status === 400
          ? "Email id already exists"
          : "An error occurred"
      );
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const result = await axios.post("/api/auth/google", {
        token: response.credential,
      });
      console.log(result.data);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/courses");
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMessage("Google login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setErrorMessage("Google login failed")}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
