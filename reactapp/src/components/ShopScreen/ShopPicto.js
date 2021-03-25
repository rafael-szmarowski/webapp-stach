import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWheelchair,
  faGlassMartini,
  faGamepad,
  faPaw,
  faCoffee,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

import { CardText } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

export default function ShopPicto({ shopDetails }) {
  var pictoTab = [];
  for (let z = 0; z < shopDetails.shopFeatures.length; z++) {
    let pictoIcon = null;
    if (shopDetails.shopFeatures[z] === "wheelchair-alt") {
      pictoIcon = faWheelchair;
    } else if (shopDetails.shopFeatures[z] === "glass") {
      pictoIcon = faGlassMartini;
    } else if (shopDetails.shopFeatures[z] === "gamepad") {
      pictoIcon = faGamepad;
    } else if (shopDetails.shopFeatures[z] === "coffee") {
      pictoIcon = faCoffee;
    } else if (shopDetails.shopFeatures[z] === "paw") {
      pictoIcon = faPaw;
    } else if (shopDetails.shopFeatures[z] === "leaf") {
      pictoIcon = faLeaf;
    }
    pictoTab.push(
      <FontAwesomeIcon
        key={z}
        icon={pictoIcon}
        size={15}
        color="black"
        style={{ padding: 2 }}
      />
    );
  }
  return <CardText>Services sur place : {pictoTab}</CardText>;
}
