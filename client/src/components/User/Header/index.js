import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import tikiBrand from "assets/img/tiki_brand.png";

import "./Header.scss";
import {
  Container,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Actions
import { getCategory } from "redux/actions/user/category";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state["user/category"]);
  const { cart } = useSelector((state) => state["user/cart"]);
  const { isLogined, user } = useSelector((state) => state["user/auth"]);

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <header id="header">
      <Container>
        <Link className="header__brand" to="/main">
          <img src={tikiBrand} />
        </Link>

        {categories.length > 0 && (
          <div className="header__menu">
            <p className="header__menu__toggle">
              <FontAwesomeIcon className="fa-2x" icon={faBars} />
              <span>
                Danh mục
                <br />
                Sản phẩm
              </span>
            </p>

            <ul className="header__sub-menu">
              {categories.map((category) => (
                <li className="header__sub-menu__item">
                  <Link to={`/main/product/${category.id}`}>
                    {category.name}
                  </Link>

                  <ul className="header__sub-menu__item__sub-menu">
                    {category.childs.map((childItem) => (
                      <li
                        className={classnames(
                          "header__sub-menu__item__sub-menu__item",
                          { "header__sub-menu__item": childItem.childs }
                        )}
                      >
                        <Link to={`/main/product/${childItem.id}`}>
                          {childItem.name}
                        </Link>

                        {childItem.childs && (
                          <ul className="header__sub-menu__item__sub-menu">
                            {childItem.childs.map((childChildItem) => (
                              <li className="header__sub-menu__item__sub-menu__item">
                                <Link to={`/main/product/${childChildItem.id}`}>
                                  {childChildItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="header__search">
          <input type="text" placeholder="Tìm sản phẩm mong muốn..." />
          <button>
            <FontAwesomeIcon icon={faSearch} /> Tìm Kiếm
          </button>
        </form>

        {!isLogined && (
          <Link className="header__login-register" to="/login">
            <FontAwesomeIcon className="fa-2x" icon={faUser} />
            {" Đăng nhập"}
          </Link>
        )}

        {user && (
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle outline color="warning" caret>
              {user.fullname}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to="/main/personInfo">Thông tin cá nhân</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Link to="/main/orderHistory">Lịch sử hóa đơn</Link>
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        )}

        <Link className="header__card" to="/main/cart">
          <div className="header__card__span">
            <FontAwesomeIcon className="fa-2x" icon={faShoppingCart} />
            <span className="header__card__span__number">{cart.length}</span>
          </div>
          Giỏ hàng
        </Link>
      </Container>
    </header>
  );
};

export default Header;
