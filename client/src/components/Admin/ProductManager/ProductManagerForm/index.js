import React from "react";

import { FastField, Form, Formik } from "formik";
import * as yup from "yup";
import InputField from "custom-field/InputField";
import { Button } from "reactstrap";

const ProductManagerFrom = ({ initialValues, onSubmit }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Bạn phải nhập tên"),
    description: yup.string().required("Bạn phải nhập miêu tả"),
    price: yup
      .number()
      .required("Bạn phải nhập giá")
      .min(0, "Giá phải lớn hơn 0"),
    brand_name: yup.string().required("Bạn phải nhập tên nhà sản xuất"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {(formikProps) => (
        <Form>
          <FastField
            name="name"
            label="Tên sản phẩm"
            component={InputField}
            className="form-control-user"
          />

          <FastField
            name="description"
            label="Mô tả"
            type="textarea"
            component={InputField}
            className="form-control-user"
          />

          <FastField
            name="price"
            label="Giá"
            type="number"
            component={InputField}
            className="form-control-user"
          />

          <FastField
            name="brand_name"
            label="Tên nhà sản xuất"
            component={InputField}
            className="form-control-user"
          />

          <Button type="submit" color="primary">
            Cập nhật
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductManagerFrom;
