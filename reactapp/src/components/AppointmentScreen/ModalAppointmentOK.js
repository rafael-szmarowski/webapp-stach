import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useHistory } from "react-router-dom";

export default function ModalAppointmentOK({ modal, toggle }) {
  let history = useHistory();

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Votre rendez-vous est confirmé !
      </ModalHeader>
      <ModalBody>
        Vous recevrez un sms 1h avant votre rendez-vous pour un rappel!
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => {
            toggle();
            history.push("/", { from: "AppointmentScreen" });
          }}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
}
