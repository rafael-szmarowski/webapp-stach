import React from "react";

import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export default function ModalAlertChoice({ modal, toggle }) {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Veuillez choisir une prestation ou expérience et une date de rendez-vous
      </ModalHeader>

      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Retour
        </Button>
      </ModalFooter>
    </Modal>
  );
}
