import React from "react";
import TopHeader from "../../../components/TopHeader";
import CompanyForm from "./CompanyForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useParams } from "react-router-dom";

const CompanyEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("adcompanydetails", `/company/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Company Profile" />
      <CompanyForm
        defaultValues={{
          companyId: list.data.companyId,
          companyName: list.data.companyName,
          companyAddress: list.data.companyAddress,
          googleDriveKey: list.data.googleDriveKey,
        }}
        action={refetch}
        btnText="Update"
        path="/company/update"
      />
    </div>
  );
};

export default CompanyEdit;
