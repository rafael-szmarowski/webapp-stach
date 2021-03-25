import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


export default function ModalComment({
  toggle,
  modal,
  shopId,
  token,
  appointmentId,
  setAppointments,
  setShops,
}) {
  const [rating, setRating] = useState(3);
  const [avis, setAvis] = useState(null);
  const [text, setText] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);

  const handleSubmit = () => {
    if (rating !== 0 && avis != null) {
      let comment = { rating: rating, avis: avis };
      addComment(comment);
    } else {
      setText("Veuillez saisir une note et un avis");
    }
  };

  var starsTab = [];
  for (let i = 0; i < 5; i++) {
    var color = "grey";
    if (i < rating) {
      color = "#AB4242";
    }
    let count = i + 1;
    starsTab.push(
      <FontAwesomeIcon
        key={i}
        style={{ marginRight: 5 }}
        icon={faStar}
        size={24}
        color={color}
        onClick={() => setRating(count)}
      />
    );
  }

  // Add Comment
  const addComment = async (comment) => {
    setLoadingComment(true);
    var newComment = await fetch(`/users/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Bearer ${token}` },
      body: `comment=${comment.avis}&rating=${comment.rating}&shop_id=${shopId}&appointmentId=${appointmentId}`,
    });
    await newComment.json();

    const getUser = async () => {
      const data = await fetch(`/users/my-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const body = await data.json();
      setShops(body.shops);
      setAppointments(body.appointments);
    };

    getUser();
    setLoadingComment(false);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Ecrivez votre avis</ModalHeader>
      <ModalBody>
        <div style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
          {starsTab}
        </div>
        <FormGroup>
          <Label for="exampleText">Votre avis :</Label>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            onChange={(e) => setAvis(e.target.value)}
            value={avis}
          />
        </FormGroup>
        <p style={{color:'red'}}>{text}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          disabled={loadingComment}
          onClick={() => {
            handleSubmit();
            toggle();
          }}
        >
          {loadingComment ? `Chargement...` : `Poster votre avis`}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Retour
        </Button>
      </ModalFooter>
    </Modal>
  );
}
