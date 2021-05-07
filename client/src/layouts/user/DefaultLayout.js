import Header from "components/User/Header";
import React from "react";

const DefaultLayout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default DefaultLayout;
