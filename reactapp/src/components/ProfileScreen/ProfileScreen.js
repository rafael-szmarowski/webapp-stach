import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Spinner,
} from "reactstrap";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import ModalComment from "./ModalComment";
import ModalCommunication from "./ModalCommunication";
import { format } from "date-fns";

function ProfileScreen({ token, saveChoosenOffer }) {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  let history = useHistory();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalMessage, setModalMessage] = useState(false);
  const toggleMessage = () => setModalMessage(!modalMessage);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    getUser();
  }, [token]);

  // Format appointment date
  const formatAppointDate = (date) => {
    const event = new Date(date);
    const frenchLocale = require("date-fns/locale/fr");
    let finalDate = format(event, "cccc dd MMMM yyyy", {
      locale: frenchLocale,
    });
    return finalDate;
  };

  //Open ModalComment
  const openComment = (shop_id, appointment_id) => {
    setAppointmentId(appointment_id);
    setShopId(shop_id);
    toggle();
  };

  //Go to ShopScreen if comment already posted
  const openShop = async (myShopId) => {
    var data = await fetch(`/shop/${myShopId}`);
    var body = await data.json();
    saveChoosenOffer(body.shop);
    history.push("/ShopScreen", { from: "ProfileScreen" });
  };

  return (
    <div className="containerProfileScreen">
      <Header />
      <Container>
        <Row>
          <Col xs={12} md={6} className="mt-4 mb-4">
            <div className="appointmentCard">
              <h2 style={{ marginBottom: 26 }}>Mes rendez-vous à venir</h2>
              {loading ? <Spinner color="primary" /> : null}
              {appointments
                .filter(
                  (appointment) => new Date(appointment.startDate) > new Date()
                )
                .map((appointment, i) => {
                  return (
                    <div>
                      <Card className="mb-2" d-flex>
                        <CardBody>
                          <CardTitle tag="h5">{shops[i].shopName}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">
                            {shops[i].shopAddress}
                          </CardSubtitle>
                          <CardText>{appointment.chosenOffer}</CardText>
                          <CardText>
                            {formatAppointDate(appointment.startDate)}
                          </CardText>

                          <Button
                            onClick={() => {
                              toggleMessage();
                            }}
                            style={{ backgroundColor: "#4280AB" }}
                          >
                            Communique avec ton coiffeur
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </Col>
          <Col xs={12} md={6} className="mt-4  mb-4">
            <div className="appointmentCard">
              <h2 style={{ marginBottom: 26 }}>Mes rendez-vous passés</h2>
              {loading ? <Spinner color="primary" /> : null}
              {appointments
                .filter(
                  (appointment) => new Date(appointment.startDate) < new Date()
                )
                .map((appointment, i) => {
                  return (
                    <div>
                      <Card className="mb-2" d-flex>
                        <CardBody>
                          <CardTitle tag="h5">{shops[i].shopName}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">
                            {shops[i].shopAddress}
                          </CardSubtitle>
                          <CardText>{appointment.chosenOffer}</CardText>
                          <CardText>
                            {formatAppointDate(appointment.startDate)}
                          </CardText>

                          {appointment.commentExists ? (
                            <Button
                              style={{ backgroundColor: "#AB4242" }}
                              onClick={() => openShop(shops[i]._id)}
                            >
                              Reprendre Rendez-vous
                            </Button>
                          ) : (
                            <Button
                              style={{ backgroundColor: "#4280AB" }}
                              onClick={() =>
                                openComment(shops[i]._id, appointment._id)
                              }
                            >
                              Écrire un avis
                            </Button>
                          )}
                        </CardBody>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </Col>
        </Row>
      </Container>
      <ModalComment
        toggle={toggle}
        modal={modal}
        shopId={shopId}
        token={token}
        appointmentId={appointmentId}
        setAppointments={setAppointments}
        setShops={setShops}
      />
      <ModalCommunication
        modalMessage={modalMessage}
        toggleMessage={toggleMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    saveChoosenOffer: function (shopDetails) {
      dispatch({
        type: "selectOffer",
        shopDetails: shopDetails,
      });
    },
  };
}

const mapStateToProps = (state) => {
  return { token: state.token };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
