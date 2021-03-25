import React, {  } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";

import {
  CardText,
} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";




export default function ShopPrice({shopDetails}) {
    
    var priceTab = [];
    for (let y = 0; y < 3; y++) {
      var color = "white";
      if (y < shopDetails.priceFork) {
        color = "black";
      }
      priceTab.push(
        <FontAwesomeIcon
          key={y}
          icon={faEuroSign}
          size={15}
          color={color}
          style={{ padding: 2 }}
        />
      );
    }
  
    return <CardText>Gamme de prix : {priceTab}</CardText>
}