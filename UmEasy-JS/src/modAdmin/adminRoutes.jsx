import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as Admin from "./index";

const adminRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="admin" element={<Admin.Dashboard />} />
      <Route path="admin/settings" element={<Admin.Settings />} />
      <Route
        path="admin/settings/company/list"
        element={<Admin.CompanyList />}
      />
      <Route path="admin/settings/company/add" element={<Admin.CompanyAdd />} />
      <Route
        path="admin/settings/company/edit/:id"
        element={<Admin.CompanyEdit />}
      />
      <Route
        path="admin/settings/department/list"
        element={<Admin.DepartmentList />}
      />
      <Route
        path="admin/settings/department/add"
        element={<Admin.DepartmentAdd />}
      />
      <Route
        path="admin/settings/department/edit/:id"
        element={<Admin.DepartmentEdit />}
      />
      <Route
        path="admin/settings/designation/list"
        element={<Admin.DesignationList />}
      />
      <Route
        path="admin/settings/designation/add"
        element={<Admin.DesignationAdd />}
      />
      <Route
        path="admin/settings/designation/edit/:id"
        element={<Admin.DesignationEdit />}
      />

      <Route path="admin/user/list" element={<Admin.UserList />} />
      <Route path="admin/user/edit/:id" element={<Admin.UserEdit />} />
      <Route path="admin/user/add" element={<Admin.UserAdd />} />
    </Route>
  </Route>
);

export default adminRoutes;
