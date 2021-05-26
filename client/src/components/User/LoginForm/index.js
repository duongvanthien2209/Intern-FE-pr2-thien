import React from "react";

import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";

import InputField from "custom-field/InputField";
import { Button } from "reactstrap";

// Validation Messages
import { VALIDATION_USERNAME, VALIDATION_PASSWORD } from "constants/index";

const LoginForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required(VALIDATION_USERNAME.required),
    password: yup
      .string()
      .required(VALIDATION_PASSWORD.required)
      .min(8, VALIDATION_PASSWORD.min),
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
