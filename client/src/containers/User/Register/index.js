import RegisterForm from "components/User/RegisterForm";
import React, { useState } from "react";

import { registerApi } from "api/User/authApi";

import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";

const Register = () => {
  const { isLogined } = useSelector((state) => state["user/auth"]);

  const [isRegisted, setRegisted] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phone: "",
    address: "",
    birthday: "",
    gender: 0,
  };

  const handleSubmit = async (values) => {
    // đổi gender
    values.gender = values.gender === 1;

    try {
      const { status, data, error } = await registerApi(values);

      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { message } = data;
        console.log(message);

        setRegisted(() => true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isRegisted && <Redirect to={{ pathname: "/login" }} />}
      {isLogined && <Redirect to={{ pathname: "/main" }} />}
      <RegisterForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
