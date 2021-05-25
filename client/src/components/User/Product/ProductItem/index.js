import React, { useEffect } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as currentfaStar } from "@fortawesome/free-regular-svg-icons";

import "./ProductItem.scss";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  let result = [];

  let i = 0;
  while (i < 5) {
    if (product.rating_average - i >= 1)
      result.push(
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
      );
    else if (product.rating_average - i < 1 && product.rating_average - i > 0) {
      result.push(
        <span>
          <FontAwesomeIcon icon={faStarHalfAlt} />
        </span>
      );
    } else
      result.push(
        <span>
          <FontAwesomeIcon icon={currentfaStar} />
        </span>
      );
    i++;
  }

  return (
    <Link to={`/main/product-detail/${product._id}`}>
      <Card className="product">
        <CardImg top width="100%" src={product.image} alt="Card image cap" />
        <CardBody className="product__body">
          <CardTitle className="product__body__title" tag="h5">
            {product.name}
          </CardTitle>
          {}
          <CardSubtitle
            tag="h6"
            className="product__body__subtitle mb-2 text-muted"
          >
            {product.rating_average > 0 && product.review_count > 0 && (
              <p className="stars">{result.map((item) => item)}</p>
            )}
            {`${product.review_count} đánh giá`}
          </CardSubtitle>
          <CardText className="product__body__text">{`${product.price} Đ`}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductItem;
