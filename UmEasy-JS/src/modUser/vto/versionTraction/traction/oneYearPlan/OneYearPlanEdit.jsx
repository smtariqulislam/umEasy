import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { AiOutlineForm } from "react-icons/ai";
import OneYearPlanFrom from "./OneYearPlanFrom";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";

const OneYearPlanEdit = ({ id, btnClass = "btn-sky w-8 h-6", size = 24 }) => {
  // const { id } = useParams();
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", `/TractionOneYearPlan/Details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className={btnClass} onClick={() => openModal()}>
        <AiOutlineForm size={size} />
      </button>
      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-sm md:max-w-screen-sm space-y-4 border bg-white rounded-lg p-5">
                <OneYearPlanFrom
                  closeModal={closeModal}
                  defaultValues={{
                    oneYearPlanId: list.data.oneYearPlanId, // Replace `list.data.oneYearPlanId` with the relevant dynamic data reference
                    fileId: list.data.fileId, // Use dynamic reference as appropriate
                    futureDate: list.data.futureDate, // Ensure this is formatted as a date string if needed
                    revenue: list.data.revenue,
                    profit: list.data.profit,
                    measurables: list.data.measurables,
                    goal1: list.data.goal1,
                    goal2: list.data.goal2,
                    goal3: list.data.goal3,
                    goal4: list.data.goal4,
                    goal5: list.data.goal5,
                    goal6: list.data.goal6,
                    goal7: list.data.goal7,
                    goal8: list.data.goal8,
                    goal9: list.data.goal9,
                    goal10: list.data.goal10,
                    goal11: list.data.goal11,
                    goal12: list.data.goal12,
                  }}
                  path="TractionOneYearPlan/update"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OneYearPlanEdit;
