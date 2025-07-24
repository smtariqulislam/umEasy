import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Input from "../../../../../components/Input";
import TextEditor from "../../../../../components/TextEditor";
import { SelectFromDb } from "../../../../../components/SelectList";
import { usePostData } from "../../../../../hooks/dataApi";

const schema = yup.object({
  title: yup.string().max(50).required("Required"),
  userId: yup.string().max(50).required("Required"),
  note: yup.string().max(250),
  departmentId: yup.string().max(50).required("Required"),
});

const HeadlineFrom = ({ defaultValues, closeModal, path, titleText }) => {
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
  const { title, note, userId, departmentId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

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
    <div className="flex w-full p-6">
      <div className="w-1/3 pr-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {titleText}
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          Share news about customers and team members. Important news about a
          customer, client, team member, or another important person. These are
          good FYIs for the meeting.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 pl-4 space-y-4">
        <div className="flex space-x-4">
          <Input
            name="title"
            label="Title"
            type="text"
            register={register}
            errorMessage={title?.message}
          />
        </div>

        <div className="flex space-x-3">
          <SelectFromDb
            control={control}
            label="Owner"
            path="/User/select"
            name="userId"
            errorMessage={userId?.message}
          />
        </div>

        <div className="flex space-x-3">
          <SelectFromDb
            control={control}
            label="Department Name"
            path="/Departments/Select"
            name="departmentId"
            errorMessage={departmentId?.message}
          />
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
          {defaultValues.headlineId === "" ? (
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
                Add Headline
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Headline
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default HeadlineFrom;
