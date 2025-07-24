/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import RocksAdd from "./traction/rocks/RocksAdd";
import TractionIssueAdd from "./traction/issuetemp/TractionIssueAdd";
import OneYearPlanList from "./traction/oneYearPlan/OneYearPlanList";
import TractionIssueList from "./traction/issuetemp/TractionIssueList";
import RocksList from "./traction/rocks/RocksList";

const Traction = ({ fileId, status }) => {
  return (
    <div className="">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-3 ">
          <OneYearPlan
            title="1-YEAR PLAN"
            content={yearPlanContent}
            fileId={fileId}
            status={status}
          />
          <IssueList
            title="ISSUES LIST"
            content={issuesContent}
            fileId={fileId}
            status={status}
          />
        </div>
        <Rocks
          title="ROCKS"
          content={rocksContent}
          fileId={fileId}
          status={status}
        />
      </div>
    </div>
  );
};

const OneYearPlan = ({ title, fileId, status }) => (
  <div className="bg-white shadow-lg rounded-lg px-4">
    <div className="bg-umojayellow flex items-center justify-between p-2">
      <span className="uppercase">{title}</span>
      {/* {status === "Final" ? <></> : <OneYearPlanAdd fileId={fileId} />} */}
    </div>
    <div className="p-2">
      <OneYearPlanList id={fileId} status={status} />
    </div>
  </div>
);
const Rocks = ({ title, fileId, status }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <div className="bg-umojayellow  flex items-center justify-between p-2">
      <span className="uppercase">{title}</span>
      {status === "Final" ? <></> : <RocksAdd fileId={fileId} />}
    </div>
    <div className="p-2">
      <RocksList id={fileId} status={status} />
    </div>
  </div>
);
const IssueList = ({ title, fileId, status }) => (
  <div className="bg-white shadow-lg rounded-lg px-4">
    <div className="bg-umojayellow  flex items-center justify-between p-2">
      <span className="uppercase">{title}</span>
      {status === "Final" ? (
        <></>
      ) : (
        <>
          <TractionIssueAdd fileId={fileId} />
        </>
      )}
    </div>
    <div className="p-2">
      <TractionIssueList id={fileId} status={status} />
    </div>
  </div>
);

const yearPlanContent = (
  <div className="text-sm text-gray-700">
    <div>Future Date:</div>
    <div>Revenue:</div>
    <div>Profit:</div>
    <div>Measurables:</div>
    <h3 className="font-semibold mt-4">Goals for the Year:</h3>
    <ol className="list-decimal pl-4">
      <li>Group CEO</li>
      <li>Group Finance Manager</li>
      <li>Group Accountant (s) x2</li>
      <li>Tax Manager</li>
      <li>Chief Internal Auditor</li>
      <li>CTO</li>
      <li>Consolidated Group Dashboard Reports</li>
      <li>Comprehensive 3-year Int’l Growth Biz Plan (new Market Tool Kit)</li>
    </ol>
  </div>
);

const rocksContent = [
  <div className="text-sm text-gray-700">
    <div>Future Date:</div>
    <div>Revenue:</div>
    <div>Profit:</div>
    <div>Measurables:</div>
    <h3 className="font-semibold mt-4">Rocks for the Quarter:</h3>
    <div className="grid grid-cols-2 gap-2">
      {["Group CEO", "Group FM", "Group Accountant", "", "", "", ""].map(
        (item, index) => (
          <React.Fragment key={index}>
            <div>
              {index + 1}. {item}
            </div>
            <div className="border-b border-gray-300"></div>
          </React.Fragment>
        )
      )}
    </div>
  </div>,
];

const issuesContent = (
  <div className="text-sm text-gray-700">
    <ol className="list-decimal pl-4 space-y-1">
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i} className="border-b py-1">
          <div className="w-full border-b border-gray-300"></div>
        </li>
      ))}
    </ol>
    <div className="mt-4">
      <h3 className="font-semibold">Prioritize</h3>
      <ul className="list-disc pl-4">
        <li>Identify</li>
        <li>Discuss</li>
        <li>Solve</li>
      </ul>
    </div>
  </div>
);

export default Traction;
