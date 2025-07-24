/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import { SelectFromDb } from "../../../../../components/SelectList";

const schema = yup.object({
  departmentId: yup.string().required("Required."),
  particular: yup.string().required("Required."),
});

const ScoreCardFrom = ({
  defaultValues,
  closeModal,
  path,
  titleText,
  btnText = "Save",
  refetch,
}) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [addCreateNew, setAddCreateNew] = useState(false);

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
  const { departmentId, particular } = errors;

  const onSubmit = async (formData) => {
    const data = new FormData();
    data.append("scoreCardId", formData.scoreCardId);
    data.append("meetingId", formData.meetingId);
    data.append("departmentId", formData.departmentId);
    data.append("particular", formData.particular);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        addCreateNew === false && closeModal();
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
      refetch();
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full h-auto bg-white rounded-md p-6">
      <div className="w-full bg-white rounded-md p-6">
        <h1 className="text-lg font-bold">{titleText}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input type="hidden" {...register("meetingId")} />
          <input type="hidden" {...register("scoreCardId")} /> */}
          <SelectFromDb
            control={control}
            label="Department"
            path="/Departments/Select"
            name="departmentId"
            errorMessage={departmentId?.message}
          />
          <Input
            name="particular"
            label="Particular"
            type="text"
            register={register}
            errorMessage={particular?.message}
          />

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              disabled={submitting}
              value={false}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setAddCreateNew(false)}
            >
              {btnText}
            </button>

            {/* <>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoreCardFrom;
