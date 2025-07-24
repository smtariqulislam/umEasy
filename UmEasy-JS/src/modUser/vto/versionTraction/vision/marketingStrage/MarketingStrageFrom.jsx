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
  marketingStrategyId: yup.number(),
  fileId: yup.number(),
  targetMarketName: yup.string().max(4000).required("Required"),
  uniques1: yup.string().max(4000).required("Required"),
  uniques2: yup.string().max(4000).required("Required"),
  uniques3: yup.string().max(4000).required("Required"),
  provenProcess: yup.string().max(50).required("Required"),
  systemPromise: yup.string().max(50).required("Required"),
});

const MarketingStrageFrom = ({ defaultValues, closeModal, path }) => {
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
  const {
    targetMarketName,
    uniques1,
    uniques2,
    uniques3,
    provenProcess,
    systemPromise,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("marketingStrategyId", formData.marketingStrategyId);
    data.append("targetMarketName", formData.targetMarketName);
    data.append("uniques1", formData.uniques1);
    data.append("uniques2", formData.uniques2);
    data.append("uniques3", formData.uniques3);
    data.append("provenProcess", formData.provenProcess);
    data.append("systemPromise", formData.systemPromise);
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
      <TextEditor
        control={control}
        name="targetMarketName"
        label="Target Market Name"
        errorMessage={targetMarketName?.message}
      />
      <Input
        name="uniques1"
        label="1 Uniques"
        type="text"
        register={register}
        errorMessage={uniques1?.message}
      />
      <Input
        name="uniques2"
        label="2 Uniques"
        type="text"
        register={register}
        errorMessage={uniques2?.message}
      />
      <Input
        name="uniques3"
        label="3 Uniques"
        type="text"
        register={register}
        errorMessage={uniques3?.message}
      />
      <Input
        name="provenProcess"
        label="Proven Process"
        type="text"
        register={register}
        errorMessage={provenProcess?.message}
      />

      <Input
        name="systemPromise"
        label="Guarntee/System Promise"
        type="text"
        register={register}
        errorMessage={systemPromise?.message}
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

export default MarketingStrageFrom;
