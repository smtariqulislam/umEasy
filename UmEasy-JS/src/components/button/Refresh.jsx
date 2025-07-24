import React from "react";
import { AiOutlineReload } from "react-icons/ai";
const Refresh = () => {
  const handleRefreshClick = () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });

    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return caches.delete(key);
        })
      );
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <button className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow">
        <AiOutlineReload onClick={handleRefreshClick} size={30} />
      </button>
    </>
  );
};

export default Refresh;
