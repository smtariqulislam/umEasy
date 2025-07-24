import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const DepartmentList = lazy(() =>
  import("./settings/department/DepartmentList")
);
const DepartmentAdd = lazy(() => import("./settings/department/DepartmentAdd"));
const DepartmentEdit = lazy(() =>
  import("./settings/department/DepartmentEdit")
);
const DesignationList = lazy(() =>
  import("./settings/designation/DesignationList")
);
const DesignationAdd = lazy(() =>
  import("./settings/designation/DesignationAdd")
);
const DesignationEdit = lazy(() =>
  import("./settings/designation/DesignationEdit")
);

const Settings = lazy(() => import("./settings/Settings"));
const CompanyList = lazy(() => import("./settings/company/CompanyList"));
const CompanyAdd = lazy(() => import("./settings/company/CompanyAdd"));
const CompanyEdit = lazy(() => import("./settings/company/CompanyEdit"));

const UserList = lazy(() => import("./user/UserList"));
const UserEdit = lazy(() => import("./user/UserEdit"));
const UserAdd = lazy(() => import("./user/UserAdd"));

export {
  Dashboard,
  DepartmentList,
  DepartmentAdd,
  DepartmentEdit,
  DesignationList,
  DesignationAdd,
  DesignationEdit,
  Settings,
  CompanyList,
  CompanyAdd,
  CompanyEdit,
  UserList,
  UserEdit,
  UserAdd,
};
