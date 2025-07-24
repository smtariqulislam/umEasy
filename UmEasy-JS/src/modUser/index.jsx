import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Vto = lazy(() => import("./vto/Vto"));
const CreateMeeting = lazy(() => import("./meeting/create/CreateMeeting"));
const VersionTraction = lazy(() =>
  import("./vto/versionTraction/VisionTraction")
);
const MeetingJoin = lazy(() => import("./meeting/join/MeetingJoin"));
const MeetingDetailsList = lazy(() =>
  import("./meeting/details/MeetingDetailsList")
);

const LevelTen = lazy(() => import("./meeting/details/LevelTen"));
const SamePage = lazy(() => import("./meeting/details/SamePage"));
const CustomAgenda = lazy(() => import("./meeting/details/CustomAgenda"));

const MyPasswordReset = lazy(() => import("./mypassword/MyPasswordReset"));

export {
  Dashboard,
  Vto,
  CreateMeeting,
  MeetingJoin,
  VersionTraction,
  MeetingDetailsList,
  LevelTen,
  SamePage,
  CustomAgenda,
  MyPasswordReset,
};
