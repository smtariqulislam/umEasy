import React from "react";
import { Link } from "react-router-dom";

export const ListHeader = ({ label, className = "flex justify-start" }) => {
  return (
    <div className={className}>
      <span className="font-semibold text-center">{label}</span>
    </div>
  );
};

export const ListCol = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <span className="inline-block md:hidden font-semibold">{label}</span>
      <span className="break-words">{value}</span>
    </div>
  );
};

export const ListColLink = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <a href={value} className="w-full btn-sky">
        <span className="break-words">{label}</span>
      </a>
    </div>
  );
};

export const ListColRouteLink = ({ label, path, value, className = "" }) => {
  return (
    <Link className={className} to={path}>
      <span className="inline-block md:hidden font-semibold">{label}</span>
      <span className="break-words">{value}</span>
    </Link>
  );
};

export const ListColDetails = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <span className="inline-block font-semibold">{label}</span>
      <span className="break-words">{value}</span>
    </div>
  );
};
