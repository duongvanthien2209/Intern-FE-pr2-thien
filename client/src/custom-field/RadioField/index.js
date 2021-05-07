import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { ErrorMessage } from "formik";

const RadioField = (props) => {
  const { field, form, options, label } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleSelectChange = (id) => {
    // debugger;
    const changeEvent = {
      target: {
        name,
        value: id,
      },
    };

    field.onChange(changeEvent);
  };

  return (
    <FormGroup tag="fieldset">
      {label && <legend>{label}</legend>}
      {options.map((option) => (
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name={name}
              onChange={() => handleSelectChange(option.id)}
              value={option.id}
            />{" "}
            {option.text}
          </Label>
        </FormGroup>
      ))}

      <Input invalid={showError} hidden />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
};

RadioField.propTypes = {
  // Custom field phải có field và form
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

RadioField.defaultProps = {
  // options: [],
  label: "",
  placeholder: "",
  disabled: false,
};

export default RadioField;
