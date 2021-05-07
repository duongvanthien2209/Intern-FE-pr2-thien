import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";

// Constaint
import {
  RESPONSE_STATUS_FAILED,
  RESPONSE_STATUS_SUCCESS,
} from "constants/index";

// Apis
import { getFilterByCategory, filterProduct } from "api/User/productApi";
import { getAllApi } from "api/User/categoryApi";
import { deleteProductApi, updateProductApi } from "api/Admin/productApi";

import ProductManagerTable from "components/Admin/ProductManager/ProductManagerTable";
import Price from "components/User/Product/SideFilter/Price";
import CurrentPagination from "components/Admin/CurrentPagination";

const ProductManager = () => {
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [chidlChildCategories, setChidlChildCategories] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(
    "60a143f9b6f98d25142a4338"
  );
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    brands: [],
    price: { current: { from: 0, to: 0 } },
    page: 1,
    rating: 0,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentCategoryId) fetchDataFilter();
  }, [currentCategoryId]);

  useEffect(() => {
    if (currentCategoryId) fetchProductData();
  }, [filter, currentCategoryId]);

  // Cập nhật sản phẩm
  const handleUpdateProduct = async (productId, formdata) => {
    try {
      // debugger;
      const { status, error, data } = await updateProductApi(
        productId,
        formdata
      );
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { message } = data;

        fetchProductData();
      }
    } catch (error) {
      return console.log(error);
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = async (productId) => {
    try {
      // debugger;
      const { status, error, data } = await deleteProductApi(productId);
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { message } = data;
        const index = products.findIndex((item) => item._id === productId);

        if (index >= 0) {
          const newProducts = JSON.parse(JSON.stringify(products));
          newProducts.splice(index, 1);
          setProducts(() => [...newProducts]);
        }
      }
    } catch (error) {
      return console.log(error);
    }
  };

  // Lấy dữ liệu categories
  const fetchData = async () => {
    try {
      // debugger;
      const { status, error, data } = await getAllApi();
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { categories: currentCategories } = data;
        setCategories(() => currentCategories);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const fetchDataFilter = async () => {
    try {
      const { status, error, data } = await getFilterByCategory(
        currentCategoryId
      );
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { brands } = data;
        setFilter(() => ({
          brands: brands.map((brand) => ({ name: brand, status: false })),
          price: { current: { from: 0, to: 0 } },
          page: 1,
          rating: 0,
        }));
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const fetchProductData = async () => {
    try {
      // debugger;
      const { status, error, data } = await filterProduct(
        currentCategoryId,
        filter
      );
      if (status === RESPONSE_STATUS_FAILED && error)
        throw new Error(error.message);

      if (status === RESPONSE_STATUS_SUCCESS && data) {
        const { products: currentProducts, total: currentTotal } = data;
        setProducts(() => currentProducts);
        setTotal(() => currentTotal);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  const handleChangeCategoryLevel1 = (currentCategoryId) => {
    // debugger;
    if (categories && categories.length > 0) {
      const index = categories.findIndex(
        (item) => item.id === currentCategoryId
      );

      if (index >= 0) setCurrentCategoryId(() => currentCategoryId);

      if (
        index >= 0 &&
        categories[index].childs &&
        categories[index].childs.length > 0
      )
        setChildCategories(() => [
          ...categories[index].childs.map((item) => ({ ...item })),
        ]);
      else {
        setChildCategories(() => []);
      }
      setChidlChildCategories(() => []);
    }
  };

  const handleChangeCategoryLevel2 = (currentCategoryId) => {
    if (childCategories && childCategories.length > 0) {
      const index = childCategories.findIndex(
        (item) => item.id === currentCategoryId
      );

      if (index >= 0) setCurrentCategoryId(() => currentCategoryId);

      if (
        index >= 0 &&
        childCategories[index].childs &&
        childCategories[index].childs.length > 0
      )
        setChidlChildCategories(() => [
          ...childCategories[index].childs.map((item) => ({ ...item })),
        ]);
      else setChidlChildCategories(() => []);
    }
  };

  const handleChangeCategoryLevel3 = (currentCategoryId) => {
    if (chidlChildCategories && chidlChildCategories.length > 0) {
      const index = chidlChildCategories.findIndex(
        (item) => item.id === currentCategoryId
      );

      if (index >= 0) setCurrentCategoryId(() => currentCategoryId);
    }
  };

  const handleChangeBrand = (currentBrandName) => {
    const index = filter.brands.findIndex((item) => item === currentBrandName);
    if (index >= 0) {
      setFilter(() => ({
        ...filter,
        brands: [
          ...filter.brands.slice(0, index).map((item) => ({ ...item })),
          { ...filter.brands[index], status: !filter.brands[index].status },
          ...filter.brands.slice(index + 1).map((item) => ({ ...item })),
        ],
      }));
    }
  };

  const handleChangeRating = (number) => {
    setFilter(() => ({
      ...filter,
      rating: number,
    }));
  };

  const handleChangePrice = (values) => {
    setFilter(() => ({
      ...filter,
      price: { current: { ...values } },
    }));
  };

  return (
    <div>
      <h1 className="h3 mb-4 text-gray-800">Quản lý sản phẩm</h1>

      <div className="productManager__filter mb-3">
        <h2>Bộ lọc</h2>

        <Row>
          <Col lg="3">
            <h3>Category</h3>

            {categories && categories.length > 0 && (
              <FormGroup>
                <Label for="exampleSelect1">Category Level 1</Label>
                <Input
                  type="select"
                  name="select1"
                  id="exampleSelect1"
                  onChange={(evt) =>
                    handleChangeCategoryLevel1(evt.target.value)
                  }
                >
                  {categories.map((item) => (
                    <option
                      selected={item.id === currentCategoryId}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}

            {childCategories && childCategories.length > 0 && (
              <FormGroup>
                <Label for="exampleSelect">Category Level 2</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect2"
                  onChange={(evt) =>
                    handleChangeCategoryLevel2(evt.target.value)
                  }
                >
                  {childCategories.map((item) => (
                    <option
                      selected={item.id === currentCategoryId}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}

            {chidlChildCategories && chidlChildCategories.length > 0 && (
              <FormGroup>
                <Label for="exampleSelect">Category Level 2</Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect3"
                  onChange={(evt) =>
                    handleChangeCategoryLevel3(evt.target.value)
                  }
                >
                  {chidlChildCategories.map((item) => (
                    <option
                      selected={item.id === currentCategoryId}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
          </Col>

          <Col lg="3">
            <div className="productManager__filter__brands">
              <h3>Nhãn hiệu</h3>
              <div
                className="productManager__filter__brands__list"
                style={{ overflowY: "scroll", height: 300 + "px" }}
              >
                {filter.brands.length > 0 &&
                  filter.brands.map((brand) => (
                    <FormGroup check>
                      <Label check>
                        <Input
                          onChange={() => handleChangeBrand(brand)}
                          type="checkbox"
                          checked={brand.status}
                        />{" "}
                        {brand.name}
                      </Label>
                    </FormGroup>
                  ))}
              </div>
            </div>
          </Col>

          <Col lg="3">
            <Price
              initialValues={filter.price.current}
              prices={[]}
              onSubmit={handleChangePrice}
            />
          </Col>

          <Col lg="3">
            <div className="productManager__filter__rating">
              <h4>Đánh giá</h4>

              <ul className="productManager__filter__rating__ul">
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChangeRating(5)}
                >
                  từ 5 Sao
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChangeRating(4)}
                >
                  từ 4 Sao
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChangeRating(3)}
                >
                  từ 3 Sao
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      {products &&
        products.length > 0 &&
        categories &&
        categories.length > 0 && (
          <ProductManagerTable
            products={products}
            categories={categories}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        )}

      {products && products.length > 0 && total > 0 && (
        <CurrentPagination
          total={total}
          page={filter.page}
          onChangePage={(number) =>
            setFilter(() => ({ ...filter, page: number }))
          }
        />
      )}
    </div>
  );
};

export default ProductManager;
