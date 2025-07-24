import React from "react";

const SaveFolder = ({ btnText, disabled, isRow = false }) => {
  return (
    <div className={isRow ? "form-row w-full" : "md:mt-6"}>
      <button type="submit" className="btn-umojablue" disabled={disabled}>
        {btnText}
      </button>
    </div>
  );
};

export default SaveFolder;
