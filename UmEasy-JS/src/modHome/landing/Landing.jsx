import React from "react";
// import { Link } from "react-router-dom";
import Signin from "./Signin";

export default function Landing() {
  return (
    <div className="max-w-full px-2 sm:px-8 lg:px-[120px] grid grid-cols-1 md:grid-cols-2">
      <div className="text-white grid">
        <div className="uppercase tracking-loose text-umojablue">
          All in one place
        </div>
        <h1 className="font-bold text-2xl lg:text-4xl my-4 text-umojayellow">
          Umoja Easy Loan
        </h1>
        <div className="leading-normal mb-4 text-md break-words text-umojablue">
          Align team around one shared vision, using one system, and drive
          greater accountability at every level.
        </div>

        <Signin />
        <div className="grid place-content-center mt-2 text-umojablue">
          Sign Up? Contact your local IT Team for support with creating a User
          Account.
          {/* <Link
            to="/forgot-password"
            className="px-4 py-2 text-white rounded-lg hover:text-umojayellow tracking-wider cursor-pointer font-semibold text-sm"
          >
            Forgot Password?
          </Link> */}
        </div>
      </div>
    </div>
  );
}
