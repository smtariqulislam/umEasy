import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  companyId: yup.string().max(50),
  companyName: yup.string().required("Required.").max(50),
  companyAddress: yup.string().required("Required.").max(50),
  googleDriveKey: yup.string().required("Required.").max(50),
});

const CompanyForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { companyName, companyAddress, googleDriveKey } = errors;

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
      }
      if (status === 204) {
        toast.success("Update successful!");
        navigate(returnPath);
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
      action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("companyId")} />
      <div className="form-col">
        <Input
          name="companyName"
          label="Company Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={companyName?.message}
        />
        <Input
          name="companyAddress"
          label="Company Address"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={companyAddress?.message}
        />

        <Input
          name="googleDriveKey"
          label="Google Drive Key"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={googleDriveKey?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default CompanyForm;
