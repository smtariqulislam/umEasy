/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import CoreFocusAdd from "./vision/coreFocus/CoreFocusAdd";
import CoreFocusList from "./vision/coreFocus/CoreFocusList";
import CoreValueAdd from "./vision/coreValue/CoreValueAdd";
import CoreValueList from "./vision/coreValue/CoreValueList";
import MarketingStrageAdd from "./vision/marketingStrage/MarketingStrageAdd";
import MarketingStrageList from "./vision/marketingStrage/MarketingStrageList";
import TenYearTargetAdd from "./vision/tenYearTarget/TenYearTargetAdd";
import TenYearTargetList from "./vision/tenYearTarget/TenYearTargetList";
import ThreeYearTargetAdd from "./vision/threeYearTarget/ThreeYearTargetAdd";
import ThreeYearTargetList from "./vision/threeYearTarget/ThreeYearTargetList";
// import ThreeYearTarget from "./vision/ThreeYearTarget";

const Vision = ({ status, fileId }) => {
  const contentRef = useRef();
  const [targetName, SetTargetName] = useState("Target");

  return (
    <div className="">
      <div
        className="grid grid-cols-4 gap-2 print:grid-cols-3 text-sm"
        contentRef={contentRef}
      >
        <div className="col-span-3 grid gap-2 rounded-lg">
          <div className="flex align-middle bg-umojayellow">
            <div className="w-4/12 flex items-center justify-between px-4">
              <span className="uppercase">Core Value</span>
              {status === "Final" ? <></> : <CoreValueAdd fileId={fileId} />}
            </div>
            <div className="w-8/12 py-2 border px-4 bg-white">
              <CoreValueList id={fileId} status={status} />
            </div>
          </div>
          <div className="flex align-middle bg-umojayellow">
            <div className="w-4/12 flex items-center justify-between px-4">
              <span className="uppercase">Core Focus</span>
              {status === "Final" ? <></> : <CoreFocusAdd fileId={fileId} />}
            </div>
            <div className="w-8/12 py-2 border px-4 bg-white">
              <CoreFocusList id={fileId} status={status} />
            </div>
          </div>
          <div className="flex align-middle bg-umojayellow">
            <div className="w-4/12 flex items-center justify-between px-4">
              <span className="uppercase">{targetName}</span>
              {status === "Final" ? (
                <></>
              ) : (
                <TenYearTargetAdd fileId={fileId} />
              )}
            </div>
            <div className="w-8/12 py-2 border px-4 bg-white">
              <TenYearTargetList id={fileId} status={status} />
            </div>
          </div>
          <div className="flex align-middle bg-umojayellow">
            <div className="w-4/12 flex items-center justify-between px-4">
              <span className="uppercase">Marketing Strategy</span>
              {status === "Final" ? (
                <></>
              ) : (
                <MarketingStrageAdd fileId={fileId} />
              )}
            </div>
            <div className="w-8/12 py-2 border px-4 bg-white">
              <MarketingStrageList id={fileId} status={status} />
            </div>
          </div>
        </div>
        <div className="col-span-1 relative overflow-hidden shadow-md rounded-lg">
          <div className="w-full text-left">
            <div>
              <div>
                <div className="bg-white shadow-lg rounded-lg">
                  <div className="bg-umojayellow flex items-center justify-between py-1 px-4">
                    <span className="uppercase">3 Year Target</span>
                    {status === "Final" ? (
                      <></>
                    ) : (
                      <ThreeYearTargetAdd fileId={fileId} />
                    )}
                  </div>
                  <div className="p-2">
                    <ThreeYearTargetList id={fileId} status={status} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
