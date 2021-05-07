import React from "react";

import { useDispatch, useSelector } from "react-redux";

// Components
import LoginForm from "components/User/LoginForm";

import { userLogin } from "redux/actions/user/auth";

const Login = () => {
  const { isLogined, token } = useSelector((state) => state["user/auth"]);

  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(userLogin(values));
  };

  return (
    <div>
      {isLogined && <h1>LOGINED: {token}</h1>}
      <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
