import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table } from "reactstrap";

// Actions
import { changeCartItem, removeCartItem } from "redux/actions/user/cart";

const Cart = () => {
  const { cart } = useSelector((state) => state["user/cart"]);
  const [totals, setTotals] = useState(cart.map((item) => item.total));
  const dispatch = useDispatch();

  const handleChangeNumber = (value, index, currentCart) => {
    setTotals(() => [
      ...totals.slice(0, index),
      value,
      ...totals.slice(index + 1),
    ]);

    if (value > 0) {
      dispatch(changeCartItem({ ...currentCart, total: parseInt(value) }));
    }
  };

  return (
    <div className="cart">
      {cart.length > 0 ? (
        <div className="cart__content">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img src={item.image} />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <Input
                      type="number"
                      value={totals[index]}
                      onChange={(evt) =>
                        handleChangeNumber(evt.target.value, index, item)
                      }
                    />
                  </td>
                  <td>{item.price * item.total}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => dispatch(removeCartItem(item._id))}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button color="primary">Thanh toán</Button>
        </div>
      ) : (
        <h1>Giỏ hàng hiện đang trống</h1>
      )}
    </div>
  );
};

export default Cart;
