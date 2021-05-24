import Header from "components/User/Header";
import React from "react";
import { Container } from "reactstrap";

const DefaultLayout = (props) => {
  return (
    <div>
      <Header />
      <main style={{ backgroundColor: "#f4f4f4", padding: "10px 0" }}>
        <Container>{props.children}</Container>
      </main>
    </div>
  );
};

export default DefaultLayout;
