/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import DatePicker from "../../../components/DatePicker";
import TextEditor from "../../../components/TextEditor";

const schema = yup.object({
  userId: yup.string().max(50),
  title: yup.string().max(50).required("Required"),
  dueDate: yup.date().required("Required"),
  note: yup.string().max(250).required("Required"),
});

const TodoPersonalFrom = ({ defaultValues, closeModal, titleText, path }) => {
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
  const { title, dueDate, note } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
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
    <div className="flex w-full h-auto bg-white rounded-md shadow-lg p-6">
      <div className="w-1/3 pr-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {titleText}
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          Help keep yourself on task. Personal to-dos are not associated with
          any of your teams but will show up in your list of to-dos to help you
          stay organized and get your personal tasks completed
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 pl-4 space-y-4">
        <input type="hidden" {...register("userId")} />
        <div className="flex space-x-4">
          <div className="w-1/2">
            <Input
              name="title"
              label="Title"
              type="text"
              register={register}
              errorMessage={title?.message}
            />
          </div>

          <div className="w-1/2">
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <DatePicker
                  label="Due Date"
                  field={field}
                  errorMessage={dueDate?.message}
                />
              )}
            />
          </div>
        </div>

        <TextEditor
          control={control}
          name="note"
          label="Note"
          errorMessage={note?.message}
        />

        <div className="flex justify-end space-x-4 mt-4">
          {defaultValues.todoId === "" ? (
            <>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Add & Create New
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add To-Do
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit To-Do
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoPersonalFrom;
