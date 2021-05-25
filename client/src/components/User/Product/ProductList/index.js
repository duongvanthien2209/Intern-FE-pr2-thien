import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProductList.scss";

// Actions
import { changeProduct } from "redux/actions/user/product";
import ProductItem from "../ProductItem";

const ProductList = () => {
  const { filter, currentCategory } = useSelector(
    (state) => state["user/filter"]
  );
  const { total, products } = useSelector((state) => state["user/product"]);

  const dispatch = useDispatch();

  useEffect(() => {
    // debugger;
    if (currentCategory) dispatch(changeProduct(filter, currentCategory.id));
  }, [filter, currentCategory]);

  return (
    <div className="product-list">
      {currentCategory && (
        <h1>{`Đang chọn: ${currentCategory.name}, ${total} kết quả`}</h1>
      )}

      <div className="product-list__items">
        {products.length > 0 &&
          products.map((product) => <ProductItem product={product} />)}
      </div>
    </div>
  );
};

export default ProductList;
