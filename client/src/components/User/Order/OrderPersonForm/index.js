import React from "react";

import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "custom-field/InputField";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import RadioField from "custom-field/RadioField";

// Validation Messages
import {
  VALIDATION_PHONE,
  VALIDATION_PAYMETHOD,
  VALIDATION_FULLNAME,
  VALIDATION_ADDRESS,
} from "constants/index";

const OrderPersonForm = ({ initialValues, onSubmit, payMethodOptions }) => {
  const validationSchema = yup.object().shape({
    fullname: yup.string().required(VALIDATION_FULLNAME.required),
    phone: yup
      .string()
      .required(VALIDATION_PHONE.required)
      .matches(/0[0-9]{9}/g, VALIDATION_PHONE.matches),
    address: yup.string().required(VALIDATION_ADDRESS.required),
    payMethod: yup.number().min(1, VALIDATION_PAYMETHOD.required),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <FastField
            name="fullname"
            label="Họ tên"
            type="text"
            component={InputField}
            className="form-control-user"
          />

          <FastField
            name="phone"
            label="Điện thoại"
            type="text"
            component={InputField}
            className="form-control-user"
          />

          <FastField
            name="address"
            label="Địa chỉ"
            type="text"
            component={InputField}
            className="form-control-user"
          />

          <FastField
            name="payMethod"
            label="Phương thức thanh toán"
            options={payMethodOptions}
            component={RadioField}
          />

          <Link className="btn btn-danger" to="/main/cart">
            Quay lại
          </Link>

          <Button type="submit" outline color="primary">
            Thanh toán
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderPersonForm;
