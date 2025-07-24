import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import TextEditor from "../../../../../components/TextEditor";
import { SelectFromOptions } from "../../../../../components/SelectList";

const schema = yup.object({
  tenYearsTargetId: yup.number(),
  fileId: yup.number(),
  tenYearsTargetName: yup.string(),
  note: yup.string().max(4000).required("Required"),
});

const TenYearTargetFrom = ({ defaultValues, closeModal, path }) => {
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
  const { tenYearsTargetName, note } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("tenYearsTargetId", formData.tenYearsTargetId);
    data.append("tenYearsTargetName", formData.tenYearsTargetName);
    data.append("note", formData.note);
    data.append("fileId", formData.fileId);

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
      <SelectFromOptions
        register={register}
        options={[" 10 Years target", "Core Target"]}
        label="10 Years target /Cause/ Passion"
        name="tenYearsTargetName"
        errorMessage={tenYearsTargetName?.message}
      />

      <TextEditor
        control={control}
        name="note"
        label="Where To be want you in the next 10 years"
        errorMessage={note?.message}
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
    </form>
  );
};

export default TenYearTargetFrom;
