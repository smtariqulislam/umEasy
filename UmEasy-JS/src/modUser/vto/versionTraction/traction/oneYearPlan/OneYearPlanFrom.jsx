/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import DatePicker from "../../../../../components/DatePicker";
import moment from "moment/moment";
import TopHeader from "../../../../../components/TopHeader";

const schema = yup.object({
  futureDate: yup.date().required("Required"),
  // fileId: yup.string().max(50).required("Required"),
  // coreValueName: yup.string().required("Required"),
});

const OneYearPlanFrom = ({ defaultValues, closeModal, path }) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    futureDate,
    revenue,
    profit,
    measurables,
    goal1,
    goal2,
    goal3,
    goal4,
    goal5,
    goal6,
    goal7,
    goal8,
    goal9,
    goal10,
    goal11,
    goal12,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("oneYearPlanId", formData.oneYearPlanId);
    data.append("fileId", formData.fileId);
    data.append(
      "futureDate",
      moment.utc(formData.futureDate).local().format("YYYY-MM-DD")
    );
    data.append("revenue", formData.revenue);
    data.append("profit", formData.profit);
    data.append("measurables", formData.measurables);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        closeModal();
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
        closeModal();
        // navigate(returnPath);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TopHeader title="1 Year  Add" />
      <div className="form-col !gap-2">
        <div className="grid grid-cols-2 w-full gap-2">
          <Controller
            control={control}
            name="futureDate"
            render={({ field }) => (
              <DatePicker
                label="Future Date"
                field={field}
                errorMessage={futureDate?.message}
              />
            )}
          />

          <Input
            name="revenue"
            label="Revenue"
            type="text"
            register={register}
            errorMessage={revenue?.message}
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-2">
          <Input
            name="profit"
            label="Profit"
            type="text"
            register={register}
            errorMessage={profit?.message}
          />

          <Input
            name="measurables"
            label="Measurables"
            type="text"
            register={register}
            errorMessage={measurables?.message}
          />
        </div>
      </div>
      <div className="flex justify-end mt-1">
        <button
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default OneYearPlanFrom;
