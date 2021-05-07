import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import {
  changeRating,
  changePrice,
  changeBrand,
} from "redux/actions/user/filter";
import Brand from "./Brand";
import Price from "./Price";

import "./SideFilter.scss";

const SideFilter = () => {
  const {
    childCategories,
    filter: {
      brands,
      price: { current, data: dataPrice },
    },
  } = useSelector((state) => state["user/filter"]);
  const dispatch = useDispatch();

  const handleChangeRating = (number) => {
    dispatch(changeRating(number));
  };

  const initialValues = {
    from: 0,
    to: 0,
  };

  const handleSubmit = (values) => {
    dispatch(changePrice(values));
  };

  const handleChangeBrand = (brand) => {
    dispatch(changeBrand(brand));
  };

  return (
    <div className="side-filter">
      {childCategories.length > 0 && (
        <div className="side-filter__category-list">
          <h4>Danh mục sản phẩm</h4>

          <ul className="side-filter__category-list__ul">
            {childCategories.map((childCategory) => (
              <li>
                <Link to={`/main/product/${childCategory._id}`}>
                  {childCategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="side-filter__rating">
        <h4>Đánh giá</h4>

        <ul className="side-filter__rating__ul">
          <li onClick={() => handleChangeRating(5)}>từ 5 Sao</li>
          <li onClick={() => handleChangeRating(4)}>từ 4 Sao</li>
          <li onClick={() => handleChangeRating(3)}>từ 3 Sao</li>
        </ul>
      </div>

      {dataPrice.length > 0 && (
        <Price
          initialValues={initialValues}
          onSubmit={handleSubmit}
          prices={dataPrice}
          current={current}
        />
      )}

      {brands.length > 0 && (
        <Brand brands={brands} onChangeBrand={handleChangeBrand} />
      )}
    </div>
  );
};

export default SideFilter;
