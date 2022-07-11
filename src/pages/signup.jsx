import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Signup = () => {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Provide a user name"),
    emailID: Yup.string().email().required("Enter your Email ID"),
    pswd: Yup.string().required("Create a password for your account"),
    confirmpassword: Yup.string().oneOf([Yup.ref("pswd"), null]),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  async function onSubmit({ userName, pswd, emailID }) {
    var maxNumber = 1000;
    var randomNumber = Math.floor(Math.random() * maxNumber + 1);
    var customerID = "CU" + JSON.stringify(randomNumber);
    try {
      const signUpResponse = await Auth.signUp({
        username: userName,
        password: pswd,
        attributes: {
          email: emailID,
          "custom:customer": customerID,
        },
      });
      toast.success("Verification lisk sent to registerd emailID.");
      setTimeout(navigate("/login"), 2000);
      console.log(signUpResponse);
    } catch (error) {
      toast.error("Username Already Exists");
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <title>B&B | Signup</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 w-full lg:w-96">
          <div className="flex flex-col mb-2">
            <p className="text-2xl text-center mb-5 text-black font-bold">
              Signup
            </p>
            <label htmlFor="userName" className="text-black font-bold text-xl">
              User Name
            </label>
            <input
              className="bg-gray-50 outline-none p-2 rounded-lg border-2 border-gray-600"
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter User Name"
              {...register("userName")}
            />
          </div>
          <p className="text-red-600">{errors.userName?.message}</p>
          <div className="flex flex-col mb-2">
            <label htmlFor="emailID" className="text-black font-bold text-xl">
              Email
            </label>
            <input
              className="bg-gray-50 outline-none p-2 rounded-lg border-2 border-gray-600"
              type="email"
              name="emailID"
              id="emailID"
              placeholder="Enter email"
              {...register("emailID")}
            />
            <p className="text-red-600">{errors.emailID?.message}</p>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="pswd" className="text-black font-bold text-xl">
              Password
            </label>
            <input
              className="bg-gray-50 outline-none p-2 rounded-lg border-2 border-gray-600"
              type="password"
              name="pswd"
              id="pswd"
              placeholder="Enter Password"
              {...register("pswd")}
            />
            <p className="text-red-600">{errors.pswd?.message}</p>
          </div>
          <div className="flex flex-col mb-2">
            <label
              htmlFor="confirmpassword"
              className="text-black font-bold text-xl"
            >
              Confirm Password
            </label>
            <input
              className="bg-gray-50 outline-none p-2 rounded-lg border-2 border-gray-600"
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm password"
              {...register("confirmpassword")}
            />
            <p className="text-red-600">
              {errors.confirmpassword &&
                "Passwords didn’t match. Please try again."}
            </p>
          </div>
          <button
            className="border-gray-600 text-black border-2 rounded-md font-bold text-xl hover:bg-gray-600 hover:text-white mt-4 p-2"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
