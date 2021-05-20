import React from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBars,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

import tikiBrand from "assets/img/tiki_brand.png";

import "./Header.scss";
import { Container } from "reactstrap";

const Header = () => {
  return (
    <header id="header">
      <Container>
        <Link className="header__brand" to="#">
          <img src={tikiBrand} />
        </Link>

        <div className="header__menu">
          <p className="header__menu__toggle">
            <FontAwesomeIcon className="fa-2x" icon={faBars} />
            <span>
              Danh mục
              <br />
              sản phẩm
            </span>
          </p>

          <ul className="header__sub-menu">
            <li className="header__sub-menu__item">
              <p>
                <FontAwesomeIcon className="fa-lg" icon={faMobileAlt} /> Điện
                thoại - Máy tính bảng
              </p>
            </li>
            <li className="header__sub-menu__item">
              <p>Điện tử - Điện lạnh</p>
            </li>
            <li className="header__sub-menu__item">
              <p>Phụ kiện - Thiết bị số</p>
            </li>
          </ul>
        </div>

        <form className="header__search">
          <input type="text" placeholder="Tìm sản phẩm mong muốn..." />
          <button>
            <FontAwesomeIcon icon={faSearch} /> Tìm Kiếm
          </button>
        </form>

        <div className="header__login/register"></div>

        <Link className="header__card" to="#">
          <div className="header__card__span">
            <FontAwesomeIcon className="fa-2x" icon={faShoppingCart} />
            <span className="header__card__span__number">0</span>
          </div>
          Giỏ hàng
        </Link>
      </Container>
    </header>
  );
};

export default Header;
