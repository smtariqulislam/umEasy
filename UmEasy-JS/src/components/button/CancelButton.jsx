import React from "react";

const CancelButton = ({ btnText, disabled,onCancel, isRow = false }) => {
  return (
    <div className={isRow ? "form-row w-full" : "md:mt-6"}>
   
    <button
      type="button"
      className="btn-umojablue"
      onClick={onCancel} // Add your cancel handler here
    >
      Cancel
    </button>
  </div>
  );
};

export default CancelButton;
