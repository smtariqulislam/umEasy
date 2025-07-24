import React from "react";
import TopHeader from "../../../components/TopHeader";

import CompanyForm from "./CompanyForm";

const DepartmentAdd = () => {
  const defaultValues = {
    companyId: "",
    companyName: "",
    companyAddress: "",
    googleDriveKey: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Company"
        btn="Return"
        path="/admin/settings/company/list"
      />
      <CompanyForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/company/create"
        returnPath="/admin/settings/company/list"
      />
    </div>
  );
};

export default DepartmentAdd;
