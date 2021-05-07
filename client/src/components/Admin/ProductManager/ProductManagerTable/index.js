import React, { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import ProductManagerFrom from "../ProductManagerForm";

const ProductManagerTable = ({
  products,
  categories,
  onDeleteProduct,
  onUpdateProduct,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);

  const getNameByCategory = (categoryId) => {
    if (categories && categories.length > 0) {
      for (let category of categories) {
        if (category.id === categoryId)
          return { name: category.name, id: category.id };
        if (category.childs && category.childs.length > 0) {
          for (let childCategory of category.childs) {
            if (childCategory.id === categoryId)
              return { name: childCategory.name, id: childCategory.id };
            if (childCategory.childs && childCategory.childs.length > 0) {
              for (let childChildCategory of childCategory.childs) {
                if (childChildCategory.id === categoryId)
                  return {
                    name: childChildCategory.name,
                    id: childChildCategory.id,
                  };
              }
            }
          }
        }
      }
    }
  };

  const handleUpdateProduct = (currentProductId) => (values) => {
    // debugger;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("brand_name", values.brand_name);
    if (file) formData.append("file", file);

    onUpdateProduct(currentProductId, formData);
    setModal(() => false);
  };

  const handleViewDetailProduct = (currentProduct) => {
    setProduct(() => ({ ...currentProduct }));
    setModal(() => true);
  };

  return (
    <Table bordered>
      {product && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Chi tiết sản phẩm</ModalHeader>
          <ModalBody>
            <img src={product.image} style={{ width: 100 + "%" }} />
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input
                type="file"
                name="file"
                id="exampleFile"
                onChange={(evt) => {
                  console.log(evt.target.files[0]);
                  setFile(() => evt.target.files[0]);
                }}
              />
            </FormGroup>
            <ProductManagerFrom
              initialValues={{
                name: product.name,
                description: product.description,
                price: product.price,
                brand_name: product.brand_name,
              }}
              onSubmit={handleUpdateProduct(product._id)}
            />
          </ModalBody>
        </Modal>
      )}
      <thead>
        <tr>
          <th>#</th>
          <th>Tên</th>
          <th>Giá</th>
          <th>Đánh giá</th>
          <th>Nhãn hiệu</th>
          <th>Loại</th>
          <th>Chi tiết</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          products.map((product, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{Math.round(product.rating_average)}</td>
              <td>{product.brand_name}</td>
              <td>{getNameByCategory(product.category[0]).name}</td>
              <td>
                <Button
                  onClick={() => handleViewDetailProduct(product)}
                  color="success"
                  block
                >
                  Xem
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => onDeleteProduct(product._id)}
                  color="danger"
                  block
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ProductManagerTable;
