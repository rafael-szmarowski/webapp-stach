import React, { useState, useEffect } from "react";

import Header from "../Header";
import { connect } from "react-redux";

import { parse, addMinutes } from "date-fns";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Container,
  Row,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

import ModalAppointmentOK from "./ModalAppointmentOK";

function AppointmentScreen(props) {
  const [loading, setLoading] = useState(false);

  const [serviceChoice, setServiceChoice] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (props.appointment.experience === "TOUTES LES EXPERIENCES") {
      setServiceChoice(props.appointment.prestation);
      setServicePrice(props.appointment.prestationPrice);
      setServiceDuration(props.appointment.prestationDuration);
      setLoyaltyPoints(50);
    } else {
      setServiceChoice(props.appointment.experience);
      setServicePrice(props.appointment.experiencePrice);
      setServiceDuration(props.appointment.experienceDuration);
      setLoyaltyPoints(100);
    }
  }, [props.appointment]);

  let startDateAppoint = parse(
    props.appointment.date + " " + props.appointment.hour,
    "dd-MM-yyyy HH:mm",
    new Date()
  );

  let endDateAppoint = addMinutes(startDateAppoint, serviceDuration);

  const handleConfirm = async () => {
    setLoading(true);
    await fetch(`/appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization : `Bearer ${props.token}` },
      body: JSON.stringify({
        chosenOffer: serviceChoice,
        chosenPrice: servicePrice,  
        chosenEmployee: props.appointment.hairdresser,
        startDate: startDateAppoint,
        endDate: endDateAppoint,
        chosenPayment: "onshop",
        appointmentStatus: "validated",
        shop_id: props.appointment.shopDetailsID,
        loyaltyPoints: loyaltyPoints,
      }),
    });
    setLoading(false);
    toggle();
  };

  return (
    <div className="containerAppointmentScreen">
      <Header />
      <Container>
        <Row>
          <Col
            xs={{ size: 12 }}
            md={{ size: 6, offset: 3 }}
            className="mt-4 mb-4"
          >
            <div className="appointmentCard">
              <h2 style={{ marginBottom: 26 }}>Récapitulatif du rendez-vous</h2>
              <Card className="mb-2" d-flex>
                <CardImg
                  top
                  width="20%"
                  src={props.appointment.shopDetailsImage}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">
                    {props.appointment.shopDetailsName}
                  </CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {props.appointment.shopDetailsAddress}
                  </CardSubtitle>
                  <CardText></CardText>
                  {props.appointment.hairdresser !== "Choix du Coiffeur" ? (
                    <CardText>
                      Professionnel : {props.appointment.hairdresser}
                    </CardText>
                  ) : (
                    <CardText>Professionnel : Aucun Coiffeur Choisi</CardText>
                  )}
                  <CardText>
                    Date et heure : {props.appointment.date} -{" "}
                    {props.appointment.hour}
                  </CardText>

                  <div>
                    <CardText>
                      Prestation :{" "}
                      {props.appointment.prestation !== "TOUTES LES PRESTATIONS"
                        ? props.appointment.prestation
                        : props.appointment.experience}
                    </CardText>
                    <CardText>
                      Total :{" "}
                      {props.appointment.prestation !== "TOUTES LES PRESTATIONS"
                        ? `${props.appointment.prestationPrice}€`
                        : `${props.appointment.experiencePrice}€`}
                    </CardText>
                  </div>

                  <CardText className="mt-4">
                    <FormGroup check>
                      <Label check>
                        <Input defaultChecked type="radio" name="radio2" />{" "}
                        Paiement sur place
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" /> Paiement en ligne
                      </Label>
                    </FormGroup>
                  </CardText>

                  <Button
                    onClick={handleConfirm}
                    style={{ backgroundColor: "#4280AB" }}
                    disabled={loading}
                  >
                    {loading ? `Chargement...` : `Valider le rendez-vous`}
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalAppointmentOK modal={modal} setModal={setModal} toggle={toggle} />
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token, appointment: state.details };
}

export default connect(mapStateToProps, null)(AppointmentScreen);
