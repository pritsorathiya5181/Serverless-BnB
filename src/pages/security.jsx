import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

function Security() {
  const validationSchema = Yup.object().shape({
    securityanswer: Yup.string().required("Enter answer"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;
  async function onSubmit({ securityanswer }) {
    // console.log(password);
    // try {
    //   await Auth.forgotPasswordSubmit(emailID, verificationCode, password);
    //   navigate("/login");
    //   toast.success("Password Reset Successful");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Incorrect Verification Code or Email Id");
    // }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>B&B | Security</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 w-full lg:w-96">
          <div className="flex flex-col mb-4">
            <label htmlFor="pswd" className="text-black font-bold text-xl">
              Security Question :
            </label>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="emailID" className="text-black font-bold text-xl">
              Security Answer
            </label>
            <input
              className="bg-gray-50 outline-none p-2 rounded-lg border-2 border-gray-600"
              type="securityanswer"
              name="securityanswer"
              id="securityanswer"
              placeholder="Enter security answer"
              {...register("securityanswer")}
            />
            <p className="text-red-600">{errors.securityanswer?.message}</p>
          </div>
          <button
            className="border-gray-600 text-black border-2 rounded-md font-bold text-xl hover:bg-gray-600 hover:text-white mt-4 p-2"
            type="submit"
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
}

export default Security;
