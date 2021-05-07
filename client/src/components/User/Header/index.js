import React from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBars,
  faMobileAlt,
  faTv,
  faHeadphonesAlt,
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
              Sản phẩm
            </span>
          </p>

          <ul className="header__sub-menu">
            <li className="header__sub-menu__item">
              <Link>
                <FontAwesomeIcon className="fa-lg" icon={faMobileAlt} /> Điện
                thoại - Máy tính bảng
              </Link>

              <ul className="header__sub-menu__item__sub-menu">
                <li className="header__sub-menu__item__sub-menu__item">
                  <Link>Điện thoại Smartphone</Link>
                </li>
                <li className="header__sub-menu__item__sub-menu__item">
                  <Link>Điện thoại phổ thông</Link>
                </li>
                <li className="header__sub-menu__item__sub-menu__item">
                  <Link>Điện thoại bàn</Link>
                </li>
              </ul>
            </li>
            <li className="header__sub-menu__item">
              <Link>
                <FontAwesomeIcon icon={faTv} /> Điện tử - Điện lạnh
              </Link>

              <ul className="header__sub-menu__item__sub-menu">
                <li className="header__sub-menu__item__sub-menu__item header__sub-menu__item">
                  <Link>Âm thanh & Phụ kiện Tivi</Link>

                  <ul className="header__sub-menu__item__sub-menu">
                    <li className="header__sub-menu__item__sub-menu__item">
                      <Link>Loa</Link>
                    </li>
                    <li className="header__sub-menu__item__sub-menu__item">
                      <Link>Phụ kiện Tivi</Link>
                    </li>
                  </ul>
                </li>
                <li className="header__sub-menu__item__sub-menu__item">
                  <Link>Tủ lạnh</Link>
                </li>
                <li className="header__sub-menu__item__sub-menu__item">
                  <Link>Máy lạnh - Máy điều hòa</Link>
                </li>
              </ul>
            </li>
            <li className="header__sub-menu__item">
              <Link>
                <FontAwesomeIcon icon={faHeadphonesAlt} /> Phụ kiện - Thiết bị
                số
              </Link>
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
