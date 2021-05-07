import React from "react";

import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import InputField from "custom-field/InputField";
import RadioField from "custom-field/RadioField";
import { Button } from "reactstrap";

const RegisterForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required("Bạn phải nhập tên đăng nhập"),
    email: yup
      .string()
      .required("Bạn phải nhập email")
      .email("Bạn phải nhập đúng định dạng email"),
    password: yup
      .string()
      .required("Bạn phải nhập mật khẩu")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Mật khẩu phải nhiều hơn 8 ký tự, bao gồm chữ in thường, in Hoa, và số"
      ),
    confirmPassword: yup
      .string()
      .required("Bạn phải nhập lại mật khẩu")
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
    fullname: yup.string().required("Bạn phải nhập họ tên"),
    phone: yup
      .string()
      .required("Bạn phải nhập số điện thoại")
      .matches(
        /0[0-9]{9}/g,
        "Số điện thoại bắt buộc phải bắt đầu bằng số 0 và có 9 chữ số"
      ),
    address: yup.string().required("Bạn nhập địa chỉ"),
    birthday: yup
      .date()
      .required("Bạn phải nhập ngày sinh")
      .max(new Date(), "Ngày sinh không được lớn hơn ngày hiện tại"),
    gender: yup.number().min(1, "Bạn phải chọn giới tính"),
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
