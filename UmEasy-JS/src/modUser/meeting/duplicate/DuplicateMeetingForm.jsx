/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
// import Input from "../../../components/Input";
import {
  // SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";

const schema = yup.object({
  quarter: yup.string().max(50).required("Required"),
});

const DuplicateMeetingAddForm = ({ defaultValues, closeModal, path }) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { quarter } = errors;

  const onSubmit = async (formData) => {
    // setSubmitting(true);
    // var data = new FormData();

    // data.append("fileName", formData.fileName);
    // data.append("folderId", folderId);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        // navigate(`/vto/folder/${folderId}`);
        closeModal();
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
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
      // action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <SelectFromOptions
            register={register}
            options={["Quarter-1", "Quarter-2", "Quarter-3", "Quarter-4"]}
            label="Quarter"
            name="quarter"
            errorMessage={quarter?.message}
          />

          <div className="flex justify-end mt-1">
            {/* <button
              onClick={closeModal}
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2 hover:bg-gray-400"
            >
              Cancel
            </button> */}
            <button
              disabled={submitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DuplicateMeetingAddForm;
