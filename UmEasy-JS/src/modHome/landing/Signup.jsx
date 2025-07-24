import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import ButtonPassword from "../../components/ButtonPassword";
import { LuUserPlus } from "react-icons/lu";
import useDebouncedApi from "../../hooks/useDebounceAPI";

const maxDigitPhone = parseInt(import.meta.env.VITE_MAX_DIGIT_PHONE);

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .length(maxDigitPhone, `Phone number must be exactly ${maxDigitPhone} digits`),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  nationalId: yup.string().required("National ID is required"),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .required("Password is required"),
});

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      firstName: "",
      lastName: "",
      nationalId: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const phoneNumber = watch("phoneNumber");

  const { trigger } = useDebouncedApi(async (value) => {
    if (!value) return;

    const { status, data } = await mutateAsync({
      path: "/auth/check",
      formData: { phoneNumber: value },
    });

    if (status === 200 && data?.found) {
      toast.success("User found, fields auto-filled");
      setValue("firstName", data.firstName || "");
      setValue("lastName", data.lastName || "");
      setValue("nationalId", data.nationalId || "");
      setUserExists(true);
    } else {
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("nationalId", "");
      setUserExists(false);
    }

    return data;
  });

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setValue("phoneNumber", value);

    if (value.length === maxDigitPhone) {
      trigger(value);
    } else {
      setUserExists(false);
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("nationalId", "");
    }
  };

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/signup",
        formData,
      });

      if (status === 200 && data?.result?.isSuccess) {
        toast.success("Signup successful!");
      } else {
        toast.error(data?.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err?.message || "Error during signup");
    } finally {
      setSubmitting(false);
    }
  };

  const showFields = phoneNumber.length === maxDigitPhone;

  return (
    <div className="mt-0 text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Phone number with country code"
            value={phoneNumber}
            onChange={handlePhoneChange}
            {...register("phoneNumber")}
            autoFocus
          />
          {errors.phoneNumber && (
            <div className="text-danger">{errors.phoneNumber.message}</div>
          )}
        </div>

        {showFields && (
          <>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                {...register("firstName")}
                disabled={userExists}
              />
              {errors.firstName && (
                <div className="text-danger">{errors.firstName.message}</div>
              )}
            </div>

            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                {...register("lastName")}
                disabled={userExists}
              />
              {errors.lastName && (
                <div className="text-danger">{errors.lastName.message}</div>
              )}
            </div>

            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="National ID"
                {...register("nationalId")}
                disabled={userExists}
              />
              {errors.nationalId && (
                <div className="text-danger">{errors.nationalId.message}</div>
              )}
            </div>

            <div className="mb-2">
              <ButtonPassword control={control} />
              {errors.password && (
                <div className="text-danger">{errors.password.message}</div>
              )}
            </div>

            <button
              className="w-full btn-umojayellow mt-3"
              type="submit"
              disabled={submitting}
            >
              Sign Up <LuUserPlus className="inline ml-2" size={20} />
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Signup;
