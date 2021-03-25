import React from "react";
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


export default function ModalComment({modalMessage, toggleMessage, message, setMessage}) {
  return (
    <Modal isOpen={modalMessage} toggle={toggleMessage}>
      <ModalHeader toggle={toggleMessage}>Ecrivez votre message</ModalHeader>
      <ModalBody>
        <div
          style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
        ></div>
        <FormGroup>
          <Label for="exampleText">Ecrivez votre message : </Label>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            toggleMessage();
            setMessage("");
          }}
        >
          Envoyer votre message
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => {
            toggleMessage();
            setMessage("");
          }}
        >
          Retour
        </Button>
      </ModalFooter>
    </Modal>
  );
}
