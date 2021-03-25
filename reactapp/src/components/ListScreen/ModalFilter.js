import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

function ModalFilter({ onSubmitSearch, search, toggle, modal }) {
  const [offer, setOffer] = useState(search.offer);
  const [experience, setExperience] = useState(search.experience);
  const [service, setService] = useState(null);
  const [priceFork, setPriceFork] = useState(null);
  const [rating, setRating] = useState(null);

  // Filter validation button
  function validationButton() {
    let offerToReducer = null;
    if (offer !== "TOUTES LES PRESTATIONS") {
      offerToReducer = offer;
    }

    let experienceToReducer = null;
    if (experience !== "TOUTES LES EXPERIENCES") {
      experienceToReducer = experience;
    }
    console.log("service", service);
    let serviceToReducer = null;
    if (service === "ACCES HANDICAPE") {
      serviceToReducer = "wheelchair-alt";
    } else if (service === "BAR") {
      serviceToReducer = "glass";
    } else if (service === "CONSOLE DE JEUX") {
      serviceToReducer = "gamepad";
    } else if (service === "ANIMAUX ACCEPTES") {
      serviceToReducer = "paw";
    } else if (service === "SOINS ECOLOGIQUES") {
      serviceToReducer = "leaf";
    } else if (service === "CAFE SUR PLACE") {
      serviceToReducer = "coffee";
    }
    setService("TOUS LES SERVICES");

    let priceForkToReducer = null;
    if (priceFork === "PRIX BAS") {
      priceForkToReducer = 1;
    } else if (priceFork === "PRIX MOYEN") {
      priceForkToReducer = 2;
    } else if (priceFork === "PRIX HAUT DE GAMME") {
      priceForkToReducer = 3;
    }
    setPriceFork("TOUS LES PRIX");

    let ratingToReducer = null;
    if (rating === "SUPERIEUR A 1") {
      ratingToReducer = 1;
    } else if (rating === "SUPERIEUR A 2") {
      ratingToReducer = 2;
    } else if (rating === "SUPERIEUR A 3") {
      ratingToReducer = 3;
    } else if (rating === "SUPERIEUR A 4") {
      ratingToReducer = 4;
    } else if (rating === "SEULEMENT 5") {
      ratingToReducer = 5;
    }
    setRating("TOUTES LES NOTES");

    onSubmitSearch(
      search.salonOrHome,
      search.completeDate,
      search.date,
      search.hour,
      search.address,
      search.latitude,
      search.longitude,
      offerToReducer,
      experienceToReducer,
      serviceToReducer,
      priceForkToReducer,
      ratingToReducer
    );
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Filtrer votre recherche</ModalHeader>
        <ModalBody>
          <div style={{ backgroundColor: "#FFE082" }}>
            <div>
              <Container>
                <Row>
                  <Col xs={12}>
                    <div
                      style={{
                        padding: 36,
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faList} />
                        </InputGroupText>
                        <Input
                          value={offer}
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(event) => {
                            setExperience("TOUTES LES EXPERIENCES");
                            setOffer(event.target.value);
                          }}
                        >
                          <option>TOUTES LES PRESTATIONS</option>
                          <option>COUPE HOMME</option>
                          <option>COUPE FEMME</option>
                          <option>COUPE HOMME + BARBE</option>
                          <option>COUPE HOMME COLORATION</option>
                          <option>COUPE FEMME COLORATION</option>
                          <option>COUPE FEMME AFRO</option>
                          <option>COUPE HOMME AFRO</option>
                          <option>COUPE FEMME BALAYAGE</option>
                          <option>COUPE FEMME PERMANENTE</option>
                        </Input>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faList} />
                        </InputGroupText>
                        <Input
                          value={experience}
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(event) => {
                            setOffer("TOUTES LES PRESTATIONS");
                            setExperience(event.target.value);
                          }}
                        >
                          <option>TOUTES LES EXPERIENCES</option>
                          <option>MOMENT A DEUX</option>
                          <option>APERO COIF</option>
                          <option>PLAY HARD CUT HARD</option>
                          <option>BIEN ETRE</option>
                        </Input>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faList} />
                        </InputGroupText>
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(event) => setService(event.target.value)}
                        >
                          <option>TOUS LES SERVICES</option>
                          <option>ACCES HANDICAPE</option>
                          <option>BAR</option>
                          <option>CONSOLE DE JEUX</option>
                          <option>ANIMAUX ACCEPTES</option>
                          <option>CAFE SUR PLACE</option>
                          <option>SOINS ECOLOGIQUE</option>
                        </Input>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faList} />
                        </InputGroupText>
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(event) => setPriceFork(event.target.value)}
                        >
                          <option>TOUS LES PRIX</option>
                          <option>PRIX BAS</option>
                          <option>PRIX MOYEN</option>
                          <option>PRIX HAUT DE GAMME</option>
                        </Input>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faList} />
                        </InputGroupText>
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          onChange={(event) => setRating(event.target.value)}
                        >
                          <option>TOUTES LES NOTES</option>
                          <option>SUPERIEUR A 1</option>
                          <option>SUPERIEUR A 2</option>
                          <option>SUPERIEUR A 3</option>
                          <option>SUPERIEUR A 4</option>
                          <option>SEULEMENT 5</option>
                        </Input>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              validationButton();
              toggle();
            }}
          >
            Filtrer
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Retour
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    saveChosenOffer: function (shopDetails) {
      dispatch({
        type: "selectOffer",
        shopDetails: shopDetails,
      });
    },
    onSubmitSearch: function (
      salonOrHome,
      completeDate,
      date,
      hour,
      address,
      latitude,
      longitude,
      offer,
      experience,
      service,
      priceFork,
      rating
    ) {
      dispatch({
        type: "createSearch",
        salonOrHome: salonOrHome,
        completeDate: completeDate,
        date: date,
        hour: hour,
        address: address,
        latitude: latitude,
        longitude: longitude,
        offer: offer,
        experience: experience,
        service: service,
        priceFork: priceFork,
        rating: rating,
      });
    },
  };
}

function mapStateToProps(state) {
  return { search: state.search };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilter);
