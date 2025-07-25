import React from "react";
import TopHeader from "../../../components/TopHeader";
import DepartmentForm from "./DepartmentForm";

const DepartmentAdd = () => {
  const defaultValues = {
    departmentId: "",
    departmentName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Department"
        btn="Return"
        path="/admin/settings/department/list"
      />
      <DepartmentForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/departments/create"
        returnPath="/admin/settings/department/list"
      />
    </div>
  );
};

export default DepartmentAdd;
