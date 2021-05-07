import SideFilter from "components/User/Product/SideFilter";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Col, Row } from "reactstrap";

// Scss
import "./Product.scss";

// Actions
import { changeCategory } from "redux/actions/user/filter";
import ProductList from "components/User/Product/ProductList";
import CurrentPagination from "components/User/Product/CurrentPagination/CurrentPagination";

const Product = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeCategory(categoryId));
  }, [categoryId]);

  return (
    <div className="product">
      <Row>
        <Col lg="3">
          <SideFilter />
        </Col>
        <Col lg="9">
          <ProductList />
          <CurrentPagination />
        </Col>
      </Row>
    </div>
  );
};

export default Product;
