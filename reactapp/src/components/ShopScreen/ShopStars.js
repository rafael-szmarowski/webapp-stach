import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { CardText } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

export default function ShopStars({ shopDetails }) {
  var roundedRating = Math.round(shopDetails.rating * 10) / 10;

  var starsTab = [];
  var flooredStarRating = Math.round(shopDetails.rating);
  for (let j = 0; j < 5; j++) {
    var color = "black";
    if (j < flooredStarRating) {
      color = "gold";
    }
    starsTab.push(
      <FontAwesomeIcon
        key={j}
        style={{ marginRight: 5 }}
        icon={faStar}
        size={24}
        color={color}
      />
    );
  }

  return (
    <CardText>
      Note globale : {starsTab} (moyenne : {roundedRating})
    </CardText>
  );
}
