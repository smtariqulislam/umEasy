import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const CompanyList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("adCompany", "/company/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Company"
        btn="Save"
        path="/admin/settings/company/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Company ID" />
          <ListHeader label="Company Name" />
          <ListHeader label="Company Address" />
          <ListHeader label="Google Drive Key" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.companyId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label=" Department Name:" value={item.companyId} />
              <ListCol label=" Department Name:" value={item.companyName} />
              <ListCol label=" Department Name:" value={item.companyAddress} />
              <ListCol label=" Department Name:" value={item.googleDriveKey} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/admin/settings/company/edit/${item.companyId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/company/delete/${item.companyId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
