/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  folderId: yup.string().max(50),
  folderName: yup.string().max(50).required("Required"),
});

const FolderForm = ({ defaultValues, closeModal, path }) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { folderName } = errors;

  const onSubmit = async (formData) => {
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        navigate("/vto");
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
      // action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("folderId")} />

      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <Input
            name="folderName"
            label="Folder Name"
            type="text"
            register={register}
            errorMessage={folderName?.message}
            isAutoFocus={true}
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

export default FolderForm;
