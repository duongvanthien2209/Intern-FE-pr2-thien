import React from "react";

import { useDispatch, useSelector } from "react-redux";

// Components
import LoginForm from "components/User/LoginForm";

import { userLogin } from "redux/actions/user/auth";
import { Redirect } from "react-router";

const Login = () => {
  const { isLogined } = useSelector((state) => state["user/auth"]);

  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(userLogin(values));
  };

  return (
    <div>
      {isLogined && <Redirect to={{ pathname: "/main" }} />}
      <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
