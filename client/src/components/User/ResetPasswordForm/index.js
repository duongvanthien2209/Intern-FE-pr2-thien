import React from "react";

import { FastField, Form, Formik } from "formik";
import * as yup from "yup";

// Validation Messages
import {
  VALIDATION_PASSWORD,
  VALIDATION_CONFIRM_PASSWORD,
  VALIDATION_CONFIRM_RESET_PASSWORD,
  VALIDATION_RESET_PASSWORD,
} from "constants/index";
import InputField from "custom-field/InputField";
import { Button } from "reactstrap";

const ResetPasswordForm = ({ initialValues, password, onSubmit }) => {
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required(VALIDATION_PASSWORD.required)
      .oneOf([password, null], VALIDATION_PASSWORD.oneOf),
    resetPassword: yup
      .string()
      .required(VALIDATION_RESET_PASSWORD.required)
      .matches(VALIDATION_PASSWORD.regex, VALIDATION_PASSWORD.matches)
      .notOneOf([password], VALIDATION_RESET_PASSWORD.notOneOf),
    confirmResetPassword: yup
      .string()
      .required(VALIDATION_CONFIRM_RESET_PASSWORD.required)
      .oneOf(
        [yup.ref("resetPassword"), null],
        VALIDATION_CONFIRM_RESET_PASSWORD.oneOf
      ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <FastField
            name="password"
            type="password"
            label="Mật khẩu hiện tại"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập mật khẩu"
          />

          <FastField
            name="resetPassword"
            type="password"
            label="Mật khẩu mới"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập mật khẩu mới"
          />

          <FastField
            name="confirmResetPassword"
            type="password"
            label="Mật khẩu"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập lại mật khẩu mới"
          />

          <Button type="submit" color="danger">
            Cập nhật
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
