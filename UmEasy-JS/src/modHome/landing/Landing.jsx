import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Landing() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-lg animate-float-delayed-1"></div>
        <div className="absolute bottom-40 left-32 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-xl animate-drift"></div>
        <div className="absolute bottom-20 right-40 w-14 h-14 bg-gradient-to-br from-pink-400/20 to-pink-600/10 rounded-full blur-lg animate-float-delayed-2"></div>
        
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-blue-500/30 to-blue-700/20 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-br from-amber-500/30 to-amber-700/20 rounded-full animate-float-delayed-half"></div>
        <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-gradient-to-br from-purple-500/30 to-purple-700/20 rounded-full animate-drift-medium"></div>
        <div className="absolute top-1/2 right-1/4 w-7 h-7 bg-gradient-to-br from-green-500/30 to-green-700/20 rounded-full animate-pulse-glow-delayed"></div>
        
        <div className="absolute top-20 left-1/2 w-4 h-4 bg-blue-400/40 rounded-full animate-float-fast"></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-amber-400/40 rounded-full animate-drift-fast"></div>
        <div className="absolute bottom-1/4 right-1/2 w-5 h-5 bg-purple-400/40 rounded-full animate-pulse-glow-fast"></div>
        <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-pink-400/40 rounded-full animate-float-medium"></div>
        <div className="absolute top-16 right-1/3 w-3 h-3 bg-green-400/40 rounded-full animate-drift-small"></div>
        <div className="absolute bottom-16 left-1/4 w-6 h-6 bg-indigo-400/40 rounded-full animate-pulse-glow-slow"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Panel */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-white backdrop-blur-xl border border-gray-300 rounded-3xl p-8 shadow-2xl shadow-gray-500/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {showSignup ? "Create Account" : "Welcome Back!"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {showSignup ? "Join our platform and get started" : "Sign in to continue your journey"}
                </p>
              </div>

              <div className="mb-6">
                {showSignup ? <Signup /> : <Signin />}
              </div>

              <div className="text-center">
                {showSignup ? "" : <div className="text-gray-500 text-sm">
                  <h6>Forgot Password?</h6>
                </div>}

                <div className="mt-4">
                  {showSignup ? (
                    <p className="text-gray-600 text-sm">
                      Already have an account?{" "}
                      <button
                        onClick={() => setShowSignup(false)}
                        className="text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-200 hover:underline"
                      >
                        Sign In
                      </button>
                    </p>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      Don't have an account?{" "}
                      <button
                        onClick={() => setShowSignup(true)}
                        className="text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-200 hover:underline"
                      >
                        Sign Up
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8 relative">
          <div className="text-center z-10">
            <div className="relative mb-6">
              <div className="w-56 h-56 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl backdrop-blur-sm border border-gray-300 flex items-center justify-center transform hover:scale-105 transition-all duration-500 shadow-2xl shadow-gray-400/20">
                  <img
                    src={showSignup ? "/images/authpageillustration2.svg" : "/images/authpageillustration.svg"}
                    alt="Illustration"
                    className="w-44 h-44 object-contain filter drop-shadow-lg rounded-lg"
                  />
                </div>

                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center animate-bounce delay-300 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center animate-bounce delay-700 shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
              All-in-One
              <span className="block bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                Platform
              </span>
            </h3>
            <p className="text-base text-gray-600 max-w-sm leading-relaxed">
              Align your team with one shared vision and drive accountability with
              powerful tools for productivity.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <div className="px-3 py-1.5 bg-blue-100 backdrop-blur-sm rounded-full border border-blue-300 text-blue-800 text-xs font-medium shadow-md">
                🚀 Fast & Secure
              </div>
              <div className="px-3 py-1.5 bg-amber-100 backdrop-blur-sm rounded-full border border-amber-300 text-amber-800 text-xs font-medium shadow-md">
                ⚡ Real-time Sync
              </div>
              <div className="px-3 py-1.5 bg-purple-100 backdrop-blur-sm rounded-full border border-purple-300 text-purple-800 text-xs font-medium shadow-md">
                🛡️ Enterprise Grade
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}