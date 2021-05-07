import PersonInfoForm from "components/User/PersonInfoForm";
import ResetPasswordForm from "components/User/ResetPasswordForm";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

import moment from "moment";

// Actions
import { userChangePassword, userUpdateInfo } from "redux/actions/user/auth";

const PersonInfo = () => {
  const { user, password } = useSelector((state) => state["user/auth"]);
  const dispatch = useDispatch();

  const userInfoInitialValues = {
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    phone: user.phone,
    address: user.address,
    birthday: moment(user.birthday).format("YYYY-MM-DD"),
    gender: !user.gender ? 1 : 2,
  };

  const resetPasswordInitialValues = {
    password: "",
    resetPassword: "",
    confirmResetPassword: "",
  };

  const handleSubmitPersonInfo = (values) => {
    values.gender = values.gender === 2;
    dispatch(userUpdateInfo(values));
  };

  const handleSubmitResetPassword = (values) => {
    dispatch(userChangePassword(values));
  };

  return (
    <div className="person-info">
      <Container>
        <Row>
          <Col lg="8">
            <h2>Thông tin người dùng</h2>
            <PersonInfoForm
              initialValues={userInfoInitialValues}
              onSubmit={handleSubmitPersonInfo}
            />
          </Col>
          <Col lg="4">
            <h2>Cập nhật mật khẩu</h2>
            <ResetPasswordForm
              initialValues={resetPasswordInitialValues}
              password={password}
              onSubmit={handleSubmitResetPassword}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PersonInfo;
