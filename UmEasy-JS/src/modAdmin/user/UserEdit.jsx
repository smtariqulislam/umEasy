import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import UserForm from "./UserForm";

const UserEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userdetails", `/user/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit User Details"
        btn="Return"
        path="/admin/user/list"
      />
      <UserForm
        defaultValues={{
          userId: list.data.id,
          companyId: list.data.companyId,
          departmentId: list.data.departmentId,
          designationId: list.data.designationId,
          fullName: list.data.fullName,
          role: list.data.role,
          phoneNumber: list.data.phoneNumber,
          imageUrl: list.data.imageUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/user/update"
        returnPath="/admin/user/list"
      />
    </div>
  );
};

export default UserEdit;
