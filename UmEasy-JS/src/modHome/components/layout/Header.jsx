import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="max-w-full px-2 sm:px-8 lg:px-[120px] flex sticky top-0 z-50 bg-white">
      <Link to="/" className="flex items-center lg:items-start py-2">
        <img className="h-10" src="/images/logo.png" alt="logo" />
      </Link>
    </div>
  );
};
export default Header;
