import React from "react";
import TopHeader from "../../components/TopHeader";
import UserForm from "./UserForm";

const UserAdd = () => {
  const defaultValues = {
    companyId: "",
    departmentId: "",
    designationId: "",
    fullName: "",
    role: "",
    phoneNumber: "",
    imageUrl: "1vyhSgRVvN5Y7FaTX2HBLGse7i2BmkDN6",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Add New User" btn="Return" path="/admin/user/list" />

      <UserForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/user/create"
        returnPath="/admin/user/list"
      />
    </div>
  );
};

export default UserAdd;
