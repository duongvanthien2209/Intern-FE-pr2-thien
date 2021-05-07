import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { changeProduct } from "redux/actions/user/product";

const ProductList = () => {
  const { filter, currentCategory } = useSelector(
    (state) => state["user/filter"]
  );
  const { total, products } = useSelector((state) => state["user/product"]);

  const dispatch = useDispatch();

  console.log(currentCategory);

  useEffect(() => {
    // debugger;
    if (currentCategory) dispatch(changeProduct(filter, currentCategory.id));
  }, [filter, currentCategory]);

  return (
    <div>
      {currentCategory && (
        <h1>{`Đang chọn: ${currentCategory.name}, ${total} kết quả`}</h1>
      )}
    </div>
  );
};

export default ProductList;
