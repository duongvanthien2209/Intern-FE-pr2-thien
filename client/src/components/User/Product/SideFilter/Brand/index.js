import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const Brand = ({ brands, onChangeBrand }) => {
  console.log("BRAND", brands);

  return (
    <div className="side-filter__brand">
      <h3>Thương hiệu</h3>

      <ul className="side-filter__brand__list">
        {brands.map((brand) => (
          <li>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  onChange={() => onChangeBrand(brand.name)}
                  checked={brand.status}
                />{" "}
                {brand.name}
              </Label>
            </FormGroup>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Brand;
