/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../../../components/SelectList";
import Input from "../../../../../components/Input";
import TextEditor from "../../../../../components/TextEditor";
import { usePostData } from "../../../../../hooks/dataApi";

const schema = yup.object({
  title: yup.string().max(50).required("Required"),
  userId: yup.string().max(50).required("Required"),
  note: yup.string().max(250),
  // fileId: yup.string().max(250).required("Required"),
});

const TractionIssueFrom = ({ defaultValues, closeModal, path, titleText }) => {
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
  const { title, userId, note, quarter, issueStatus, departmentId } = errors;

  const onSubmit = async (formData) => {
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
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
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full h-auto rounded-md p-6">
      <div className="w-1/3 pr-4 border-r">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {titleText}
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          To be discussed during IDS. This will be prioritized and discussed
          during the Identify/Discuss/Solve part of your meeting.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 pl-4 space-y-4">
        <Input
          name="title"
          label="Title"
          type="text"
          register={register}
          errorMessage={title?.message}
        />

        <SelectFromDb
          control={control}
          label="Owner"
          path="/user/select"
          name="userId"
          errorMessage={userId?.message}
        />

        <SelectFromOptions
          register={register}
          options={["Quarter-1", "Quarter-2", "Quarter-3", "Quarter-4"]}
          label="Quarter"
          name="quarter"
          errorMessage={quarter?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Open", "Closed"]}
          label="Status"
          name="issueStatus"
          errorMessage={issueStatus?.message}
        />

        <SelectFromDb
          control={control}
          label="Department"
          path="/Departments/Select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />

        <div className="relative">
          <TextEditor
            control={control}
            name="note"
            label="Note"
            errorMessage={note?.message}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          {defaultValues.issueId === "" ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                value={true}
                onClick={() => setAddCreateNew(true)}
              >
                Add & Create New
              </button>
              <button
                type="submit"
                disabled={submitting}
                value={false}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setAddCreateNew(false)}
              >
                Add Issue
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Issue
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default TractionIssueFrom;
