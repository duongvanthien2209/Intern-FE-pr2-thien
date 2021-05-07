import React from "react";

import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import InputField from "custom-field/InputField";
import RadioField from "custom-field/RadioField";
import { Button } from "reactstrap";

// Validation Messages
import {
  VALIDATION_USERNAME,
  VALIDATION_EMAIL,
  VALIDATION_PASSWORD,
  VALIDATION_CONFIRM_PASSWORD,
  VALIDATION_FULLNAME,
  VALIDATION_PHONE,
  VALIDATION_ADDRESS,
  VALIDATION_BIRTHDAY,
  VALIDATION_GENDER,
} from "constants/index";

const RegisterForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required(VALIDATION_USERNAME.required),
    email: yup
      .string()
      .required(VALIDATION_EMAIL.required)
      .email(VALIDATION_EMAIL.isEmail),
    password: yup
      .string()
      .required(VALIDATION_PASSWORD.required)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        VALIDATION_PASSWORD.matches
      ),
    confirmPassword: yup
      .string()
      .required(VALIDATION_CONFIRM_PASSWORD.required)
      .oneOf([yup.ref("password"), null], VALIDATION_CONFIRM_PASSWORD.oneOf),
    fullname: yup.string().required(VALIDATION_FULLNAME.required),
    phone: yup
      .string()
      .required(VALIDATION_PHONE.required)
      .matches(/0[0-9]{9}/g, VALIDATION_PHONE.matches),
    address: yup.string().required(VALIDATION_ADDRESS.required),
    birthday: yup
      .date()
      .required(VALIDATION_BIRTHDAY.required)
      .max(new Date(), VALIDATION_BIRTHDAY.max),
    gender: yup.number().min(1, VALIDATION_GENDER.required),
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
            name="username"
            label="Tên đăng nhập"
            component={InputField}
            className="form-control-user"
            placeholder="Tên đăng nhập"
          />
          <FastField
            name="email"
            label="Email"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập email"
          />

          <FastField
            name="password"
            type="password"
            label="Mật khẩu"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập mật khẩu"
          />

          <FastField
            name="confirmPassword"
            type="password"
            label="Mật khẩu"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập lại mật khẩu"
          />

          <FastField
            name="fullname"
            label="Họ và tên"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập họ và têns"
          />

          <FastField
            name="phone"
            label="Số điện thoại"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập số điện thoại"
          />

          <FastField
            name="address"
            label="Địa chỉ"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập địa chỉ"
          />

          <FastField
            name="birthday"
            type="date"
            label="Ngày sinh"
            component={InputField}
            className="form-control-user"
            placeholder="Nhập ngày sinh"
          />

          <FastField
            name="gender"
            label="Giới tính"
            options={[
              { id: 1, text: "Nam" },
              { id: 2, text: "Nữ" },
            ]}
            component={RadioField}
          />

          <Button type="submit" color="primary">
            ADD
          </Button>
        </Form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
