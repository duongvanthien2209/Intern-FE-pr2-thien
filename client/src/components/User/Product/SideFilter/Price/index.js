import InputField from "custom-field/InputField";
import { Formik, Form, FastField } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import * as yup from "yup";

import { changePrice } from "redux/actions/user/filter/index";

const Price = ({ initialValues, prices, onSubmit }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    from: yup.number().moreThan(-1, "Bạn không được nhập số âm"),
    to: yup.number().moreThan(-1, "Bạn không được nhập số âm"),
  });

  const handleChangePrice = (values) => {
    dispatch(changePrice(values));
  };

  return (
    <div className="side-filter__price">
      <h3>Giá</h3>
      <ul className="side-filter__price__list">
        {prices.map((price) => {
          if (price.from === 0 && price.to !== 0)
            return (
              <li
                onClick={() => handleChangePrice(price)}
              >{`Dưới ${price.to}`}</li>
            );
          if (price.from !== 0 && price.to === 0)
            return (
              <li
                onClick={() => handleChangePrice(price)}
              >{`Trên ${price.from}`}</li>
            );
          return (
            <li
              onClick={() => handleChangePrice(price)}
            >{`Từ ${price.from} đến ${price.to}`}</li>
          );
        })}
      </ul>
      <h4>Chọn khoảng giá</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <FastField
              name="from"
              type="number"
              component={InputField}
              className="form-control-user"
            />
            <FastField
              name="to"
              type="number"
              component={InputField}
              className="form-control-user"
            />

            <Button type="submit" outline color="primary">
              Áp dụng
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Price;
