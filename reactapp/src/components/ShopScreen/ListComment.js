import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import {
  CardText,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

export default function ListComment({ comments }) {
  var listCommentItem = comments.map((l, i) => {
    //* mapping on stars for comments:
    var starCommentTab = [];
    for (let i = 0; i < 5; i++) {
      var starCommentColor = "black";
      if (i < l.rating) {
        starCommentColor = "gold";
      }
      starCommentTab.push(
        <FontAwesomeIcon
          style={{ marginRight: 5 }}
          key={i}
          icon={faStar}
          size={24}
          color={starCommentColor}
        />
      );
    }
    return (
      <CardText>
        <ListGroup key={i}>
          <ListGroupItem>
            <ListGroupItemHeading>
              {starCommentTab} Moyenne: {l.rating}/5{" "}
            </ListGroupItemHeading>
            <ListGroupItemText>{l.comment}</ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </CardText>
    );
  });

  return listCommentItem;
}
