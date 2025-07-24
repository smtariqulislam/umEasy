import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";

const schema = yup.object({
  coreValueId: yup.number(),
  fileId: yup.number(),
  coreValueName: yup.string().max(50).required("Required"),
});

// eslint-disable-next-line react/prop-types
const CoreValueFrom = ({ defaultValues, closeModal, path }) => {
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
  const { coreValueName } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("coreValueId", formData.coreValueId);
    data.append("coreValueName", formData.coreValueName);
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
      <Input
        name="coreValueName"
        label="Core Value"
        type="text"
        register={register}
        errorMessage={coreValueName?.message}
      />

      <div className="flex justify-end mt-1">
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

export default CoreValueFrom;
