import React from "react";
import { Link } from "react-router-dom";

const SettingsItem = ({ name, link, Icon }) => {
  return (
    <Link
      className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
      to={link}
    >
      <Icon size={40} />
      <span className="font-medium text-center">{name}</span>
    </Link>
  );
};

export default SettingsItem;
