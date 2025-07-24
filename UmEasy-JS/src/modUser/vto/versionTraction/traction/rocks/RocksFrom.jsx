import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../../../components/SelectList";

const schema = yup.object({
  fileId: yup.number(),
  goalId: yup.string().max(50).required("Required"),
  departmentId: yup.string().max(50).required("Required"),
});

// eslint-disable-next-line react/prop-types
const RocksFrom = ({ defaultValues, closeModal, path, btnText }) => {
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
  const { goalId, rockOwner, rock, quarter, departmentId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("rockId", formData.rockId);
    data.append("rock", formData.rock);
    data.append("goalId", formData.goalId);
    data.append("quarter", formData.quarter);
    data.append("departmentId", formData.departmentId);
    data.append("rockOwner", formData.rockOwner);
    data.append("fileId", formData.fileId);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
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
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectFromDb
        control={control}
        label="Goal Select"
        path={`/TractionOneYearPlanGoal/select/${defaultValues.fileId}`}
        name="goalId"
        errorMessage={goalId?.message}
      />

      <SelectFromOptions
        register={register}
        options={["Quarter-1", "Quarter-2", "Quarter-3", "Quarter-4"]}
        label="Quarter"
        name="quarter"
        errorMessage={quarter?.message}
      />

      <SelectFromDb
        control={control}
        label="Department"
        path="/departments/select"
        name="departmentId"
        errorMessage={departmentId?.message}
      />

      {/* <SelectFromOptions
        register={register}
        label="Department Name"
        options={[
          "Operations",
          "Human Resources (HR)",
          "IT",
          "Audit",
          "Financial",
        ]}
        name="departmentName"
        errorMessage={departmentName?.message}
      /> */}

      <Input
        name="rock"
        label="Rocks"
        type="text"
        register={register}
        errorMessage={rock?.message}
      />

      <SelectFromDb
        control={control}
        label="Rock Owner"
        path="/user/select"
        name="rockOwner"
        errorMessage={rockOwner?.message}
      />

      <div className="flex justify-end mt-1">
        <button
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {btnText}
        </button>
      </div>
    </form>
  );
};

export default RocksFrom;
