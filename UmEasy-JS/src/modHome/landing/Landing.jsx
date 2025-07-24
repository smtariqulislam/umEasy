import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Landing() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-gray-100">
      {/* Left Panel */}
      <div className="flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center text-umojayellow mb-2">
            {showSignup ? "Create Account" : "Welcome Back!"}
          </h2>
          <p className="text-center text-sm text-umojablue mb-4">
            {showSignup ? "Sign up to get started" : "Login to your account"}
          </p>

          {showSignup ? <Signup /> : <Signin />}

          <div className="text-center mt-4 text-sm text-umojablue">
            {showSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setShowSignup(false)}
                  className="text-umojayellow font-semibold hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setShowSignup(true)}
                  className="text-umojayellow font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex flex-col items-center justify-center text-center p-8 bg-umojablue text-white">
        <img
          src="/images/authpageillustration.svg"
          alt="Illustration"
          className="w-1/3 mb-6 rounded-lg"
        />
        <h3 className="text-3xl font-bold mb-2">All-in-One Platform</h3>
        <p className="text-md max-w-md">
          Align your team with one shared vision and drive accountability with
          powerful tools for productivity.
        </p>
      </div>
    </div>
  );
}
