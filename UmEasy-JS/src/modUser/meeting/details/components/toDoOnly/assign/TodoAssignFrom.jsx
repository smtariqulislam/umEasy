/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import TodoAssignList from "./TodoAssignList";
import { usePostData } from "../../../../../../hooks/dataApi";
import { SelectFromDb } from "../../../../../../components/SelectList";

const schema = yup.object({
  userId: yup.string().max(50).required("Required"),
});

const TodoAssignFrom = ({ defaultValues, closeModal, path, titleText }) => {
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
  const { userId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        addCreateNew === false && closeModal();
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
    <div className="flex w-full h-auto bg-white rounded-md shadow-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* <input type="hidden" {...register("meetingId")} /> */}
        <input type="hidden" {...register("todoId")} />
        <div className="flex space-x-4">
          <SelectFromDb
            control={control}
            label="Assign"
            path="/user/select"
            name="userId"
            errorMessage={userId?.message}
          />

          <button
            type="submit"
            disabled={submitting}
            className="px-2 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            value={true}
            onClick={() => setAddCreateNew(true)}
          >
            Add
          </button>
        </div>
        <TodoAssignList
          todoId={defaultValues.todoId}
          meetingId={defaultValues.meetingId}
        />
      </form>
    </div>
  );
};

export default TodoAssignFrom;
