/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import DatePicker from "../../../../../components/DatePicker";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../../../components/SelectList";
import TextEditor from "../../../../../components/TextEditor";

const schema = yup.object({
  title: yup.string().max(50).required("Required"),
  userId: yup.string().max(50),
  dueDate: yup.date().required("Required"),
  note: yup.string().max(250).required("Required"),
  rockType: yup.string().max(250).required("Required"),
  status: yup.string().max(50).required("Required"),
  departmentId: yup.string().max(50).required("Required"),
});

const RocksFrom = ({ defaultValues, closeModal, path, titleText }) => {
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
  const { title, dueDate, note, status, userId, rockType, departmentId } =
    errors;

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
          To-Dos are seven-day action items. The items on this list are weekly
          commitments, 90% of which should drop off every week. No To-Do should
          remain on the list for longer than two weeks.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 pl-4 space-y-4">
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

        <div className="flex space-x-3">
          <div className="w-1/2">
            <SelectFromDb
              control={control}
              label="Owner"
              path="/user/select"
              name="userId"
              errorMessage={userId?.message}
            />
          </div>

          <div className="w-1/2">
            <SelectFromOptions
              register={register}
              options={["Individual ", "Company", "Departments", "Team"]}
              label="Type"
              name="rockType"
              errorMessage={rockType?.message}
            />
          </div>

          <div className="w-1/2">
            <SelectFromOptions
              register={register}
              // "Non-Rock", "Not Done"
              options={["Off-Track", "On-Track"]}
              label="Status"
              name="status"
              errorMessage={status?.message}
            />
          </div>

          <div className="w-1/2">
            <SelectFromDb
              control={control}
              label="Department"
              path="/Departments/Select"
              name="departmentId"
              errorMessage={departmentId?.message}
            />
          </div>
        </div>

        <div>
          <div className="relative">
            <TextEditor
              control={control}
              name="note"
              label="Note"
              errorMessage={note?.message}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          {defaultValues.rocksId === "" ? (
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
                Add Rocks
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Rocks
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default RocksFrom;
