import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// Actions
import { addCartItem } from "redux/actions/user/cart";

// Apis
import { getProduct } from "api/User/productApi";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";
import { Button, Input } from "reactstrap";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [total, setTotal] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [productId]);

  const fetchData = async () => {
    try {
      const { status, error, data } = await getProduct(productId);

      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { product: currentProduct } = data;
        setProduct(() => currentProduct);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleChangeTotal = (evt) => {
    const value = evt.target.value;

    setTotal(() => parseInt(value));
  };

  const handleAddCartItem = () => {
    if (total >= 1) dispatch(addCartItem({ ...product, total }));
  };

  return (
    product && (
      <div className="product-detail">
        <h1>{product.name}</h1>

        <div className="product-detail__total">
          <Input type="number" value={total} onChange={handleChangeTotal} />
        </div>

        <Button color="danger" onClick={handleAddCartItem}>
          Chọn mua
        </Button>
      </div>
    )
  );
};

export default ProductDetail;
