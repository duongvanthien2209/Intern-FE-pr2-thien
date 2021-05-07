import React from "react";

import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";

import InputField from "custom-field/InputField";
import { Button } from "reactstrap";

const LoginForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Bạn phải nhập tên đăng nhập hoặc địa chỉ email"),
    password: yup
      .string()
      .required("Bạn phải nhập mật khẩu.")
      .min(8, "Mật khẩu không được ít hơn 8 ký tự."),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <FastField
            name="username"
            label="Tên đăng nhập"
            component={InputField}
            className="form-control-user"
            placeholder="Tên đăng nhập hoặc địa chỉ email"
          />

          <FastField
            name="password"
            label="Mật khẩu"
            type="password"
            component={InputField}
            className="form-control-user"
            placeholder="Mật khẩu"
          />

          <Button type="submit" color="primary">
            LOGIN
          </Button>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
