import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as User from "./index";

const userRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="dashboard" element={<User.Dashboard />} />
      <Route path="createmeeting" element={<User.CreateMeeting />} />
      <Route path="vto" element={<User.Vto />} />
      <Route path="vto/file/:id" element={<User.VersionTraction />} />
      <Route path="meeting" element={<User.MeetingDetailsList />} />
      <Route path="meeting/join/:id" element={<User.MeetingJoin />} />
      <Route path="meeting/samePage/:id" element={<User.SamePage />} />
      <Route path="meeting/level10/:id" element={<User.LevelTen />} />
      <Route path="meeting/customAgenda/:id" element={<User.CustomAgenda />} />
      <Route path="my/password/Reset" element={<User.MyPasswordReset />} />

      {/* <Route path="underconstruction" element={<User.UnderConstruction />} /> */}
    </Route>
  </Route>
);

export default userRoutes;
