import LoginForm from "components/Admin/LoginForm";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

// Actions
import { adminLogin } from "redux/actions/admin/auth";

const Login = () => {
  const { isLogined } = useSelector((state) => state["admin/auth"]);
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(adminLogin(values));
  };

  return (
    <div>
      {isLogined && <Redirect to={{ pathname: "/admin" }} />}
      <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
