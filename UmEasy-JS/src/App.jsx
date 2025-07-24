import { Suspense } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Toaster } from "react-hot-toast";
import { Routes } from "react-router-dom";
import { FallbackLoading } from "./components/Loading";
import { useGlobalContext } from "./hooks/context";
import adminRoutes from "./modAdmin/adminRoutes";
import userRoutes from "./modUser/userRoutes";
import homeRoutes from "./modHome/homeRoutes";
import grapesRoutes from "./modGrapesAdmin/grapesRoutes";

//test
function App() {
  const value = useGlobalContext();
  const onIdle = () => {
    value.signOut();
  };

  const idleTimer = useIdleTimer({ onIdle, timeout: 1000 * 60 * 15 });
  console.log("It's the Time to Coffee!", idleTimer);

  return (
    <Suspense fallback={<FallbackLoading />}>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {homeRoutes}
        {userRoutes}
        {adminRoutes}
        {grapesRoutes}
      </Routes>
    </Suspense>
  );
}

export default App;
