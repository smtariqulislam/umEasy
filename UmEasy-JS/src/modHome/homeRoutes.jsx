import { Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/layout/Layout";
import * as Home from "./index";

const homeRoutes = (
  <Route path="/*" element={<PublicRoute />}>
    <Route element={<Layout />}>
      <Route path="" element={<Home.Landing />} />
      <Route path="forgot-password" element={<Home.ForgotPassword />} />
      <Route path="reset-password/:id" element={<Home.ResetPassword />} />
     
      <Route path="reset-password" element={<Home.ResetPasswordNew />} />
      
      <Route path="*" element={<Home.NotFound />} />
    </Route>
    <Route path="verify-2fa" element={<Home.AuthQRVerification />} />
  </Route>
);

export default homeRoutes;
