import React from "react";
import { Link } from "react-router-dom";
import Icons from "./Icons";

const SettingsItemOnline = ({ name, link, icon }) => {
  return (
    <Link
      className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
      to={link}
    >
      <Icons name={icon} size={40} />
      <span className="font-medium text-center">{name}</span>
    </Link>
  );
};

export default SettingsItemOnline;
