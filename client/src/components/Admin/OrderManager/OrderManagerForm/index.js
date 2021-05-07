import React from "react";

import { FastField, Form, Formik, validateYupSchema } from "formik";
import * as yup from "yup";
import InputField from "custom-field/InputField";
import { Button } from "reactstrap";

import { VALIDATION_DATE_FROM, VALIDATION_DATE_TO } from "constants/index";

const OrderManagerForm = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    from: yup
      .date()
      .required(VALIDATION_DATE_FROM.required)
      .max(yup.ref("to"), VALIDATION_DATE_FROM.max),
    to: yup
      .date()
      .required(VALIDATION_DATE_TO.required)
      .min(yup.ref("from"), VALIDATION_DATE_TO.min),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <FastField
            name="from"
            type="date"
            label="Từ ngày"
            component={InputField}
            className="form-control-user"
          />

          <FastField
            name="to"
            type="date"
            label="Đến ngày"
            component={InputField}
            className="form-control-user"
          />

          <Button className="mb-2" type="submit" color="primary">
            Tìm
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderManagerForm;
