import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import TextArea from "../../../../../components/TextArea";
import { SelectFromOptions } from "../../../../../components/SelectList";

const schema = yup.object({
  coreFocusId: yup.number(),
  fileId: yup.number(),
  purposeCause: yup.string().max(50).required("Required"),
  description: yup.string().max(50).required("Required"),
  ourNiche: yup.string().max(50).required("Required"),
});

const CoreFocusFrom = ({ defaultValues, path, closeModal }) => {
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
  const { purposeCause, description, ourNiche } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("coreFocusId", formData.coreFocusId);
    data.append("purposeCause", formData.purposeCause);
    data.append("description", formData.description);
    data.append("ourNiche", formData.ourNiche);
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
      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={["Purpose", "Cause", "Passion"]}
          label="Purpose /Cause/ Passion"
          name="purposeCause"
          errorMessage={purposeCause?.message}
        />
        <TextArea
          control={control}
          name="description"
          label="Description"
          errorMessage={description?.message}
          areaHeight="h-16"
          isAutoFocus={true}
        />
        <TextArea
          control={control}
          name="ourNiche"
          label="Our Niche"
          errorMessage={ourNiche?.message}
          areaHeight="h-16"
          isAutoFocus={true}
        />

        <div className="flex w-full justify-end mt-1">
          <button
            disabled={submitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
        
      </div>
    </form>
  );
};

export default CoreFocusFrom;
