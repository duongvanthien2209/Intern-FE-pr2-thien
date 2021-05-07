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
  VALIDATION_FULLNAME,
  VALIDATION_PHONE,
  VALIDATION_ADDRESS,
  VALIDATION_BIRTHDAY,
  VALIDATION_GENDER,
} from "constants/index";

const PersonInfoForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required(VALIDATION_USERNAME.required),
    email: yup
      .string()
      .required(VALIDATION_EMAIL.required)
      .email(VALIDATION_EMAIL.isEmail),
    fullname: yup.string().required(VALIDATION_FULLNAME.required),
    phone: yup
      .string()
      .required(VALIDATION_PHONE.required)
      .matches(VALIDATION_PHONE.regex, VALIDATION_PHONE.matches),
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
            Cập nhật
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PersonInfoForm;
