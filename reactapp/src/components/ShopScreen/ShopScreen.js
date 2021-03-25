import React, { useState, useEffect } from "react";

import Header from "../Header";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Container,
  Row,
} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

import { useHistory } from "react-router-dom";
import ListComment from "./ListComment";
import ShopCarousel from "./ShopCarousel";
import HoursTab from "./HoursTab";
import ShopMapContainer from "./ShopMapContainer";

import { format } from "date-fns";
import ModalAlertChoice from "./ModalAlertChoice";
import ShopInputSelect from "./ShopInputSelect";
import ShopPicto from "./ShopPicto";
import ShopStars from "./ShopStars";
import ShopPrice from "./ShopPrice";

function ShopScreen(props) {
  const startDate = new Date();
  const [date, setDate] = useState(new Date());

  const [offer, setOffer] = useState("TOUTES LES PRESTATIONS");
  const [experience, setExperience] = useState("TOUTES LES EXPERIENCES");
  const [coiffeurs, setCoiffeurs] = useState("Choix du Coiffeur");

  const [experiencePrice, setExperiencePrice] = useState();
  const [experienceDuration, setExperienceDuration] = useState();
  const [prestaPrice, setPrestaPrice] = useState();
  const [prestaDuration, setPrestaDuration] = useState();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let history = useHistory();

  //Favorites handler
  const [favorite, setFavorite] = useState(false);
  const [favColor, setFavColor] = useState("black");
  const [errorFavorite, setErrorFavorite] = useState("");

  useEffect(() => {
    async function getResponse() {
      if (props.token) {
        let shopsFetch = await fetch(`/favorites`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        });
        let body = await shopsFetch.json();
        for (let i = 0; i < body.favoriteShops.length; i++) {
          if (body.favoriteShops[i]._id === props.shopDetails._id) {
            setFavorite(true);
            setFavColor("red");
          }
        }
      }
    }
    getResponse();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, [props.token, props.shopDetails]);

  var handleFavorite = async () => {
    if (props.token) {
      if (favorite === false) {
        props.favoriteShops(props.shopDetails._id);
        await fetch(`/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${props.token}`,
          },
          body: `id=${props.shopDetails._id}`,
        });

        setFavorite(true);
        setFavColor("red");
      } else {
        await fetch(`/favorites/${props.shopDetails._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${props.token}`,
          },
        });
        setFavorite(false);
        setFavColor("black");
      }
    } else {
      setErrorFavorite(
        "Connectez-vous ou Créez un compte pour rajouter des favoris"
      );
    }
  };

  //Adding input values according to previous search
  useEffect(() => {
    if (props.search.offer !== "TOUTES LES PRESTATIONS") {
      for (let i = 0; i < props.shopDetails.offers.length; i++) {
        if (props.shopDetails.offers[i].type === props.search.offer) {
          setOffer(
            `${props.search.offer} - ${props.shopDetails.offers[i].price}€`
          );
          setPrestaPrice(props.shopDetails.offers[i].price);
          setPrestaDuration(props.shopDetails.offers[i].duration);
        }
      }
    }
    if (props.search.experience !== "TOUTES LES EXPERIENCES") {
      for (let i = 0; i < props.shopDetails.packages.length; i++) {
        if (props.shopDetails.packages[i].type === props.search.experience) {
          setExperience(
            `${props.search.experience} - ${props.shopDetails.packages[i].price}€`
          );
          setExperienceDuration(props.shopDetails.packages[i].duration);
          setExperiencePrice(props.shopDetails.packages[i].price);
        }
      }
    }

    if (props.search.date != null) {
      setDate(
        new Date(
          props.search.date.split("-")[2],
          props.search.date.split("-")[1] - 1,
          props.search.date.split("-")[0]
        )
      );
    }
  }, [props.search, props.shopDetails]);

  //* Time function to handle opening schedules and available time spots

  const [chosenHour, setChosenHour] = useState();
  const [chosenVar, setChosenVar] = useState(
    props.chosenDate || format(new Date(), "dd-MM-yyyy")
  );

  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  function validationChoice() {
    let convertedHour = convertMinsToTime(chosenHour);
    let experienceToReducer = experience.split(" -")[0];
    let offerToReducer = offer.split(" -")[0];

    let offerPriceToReducer = prestaPrice;
    let offerDurationToReducer = prestaDuration;

    let experiencePriceToReducer = experiencePrice;
    let experienceDurationToReducer = experienceDuration;

    if (offerToReducer !== "TOUTES LES PRESTATIONS") {
      for (let i = 0; i < props.shopDetails.offers.length; i++) {
        if (props.shopDetails.offers[i].type === offerToReducer) {
          offerPriceToReducer = props.shopDetails.offers[i].price;
          offerDurationToReducer = props.shopDetails.offers[i].duration;
        }
      }
    }
    if (experienceToReducer !== "TOUTES LES EXPERIENCES") {
      for (let i = 0; i < props.shopDetails.packages.length; i++) {
        if (props.shopDetails.packages[i].type === experienceToReducer) {
          experiencePriceToReducer = props.shopDetails.packages[i].price;
          experienceDurationToReducer = props.shopDetails.packages[i].duration;
        }
      }
    }

    if (
      chosenHour === undefined ||
      (offer === "TOUTES LES PRESTATIONS" &&
        experience === "TOUTES LES EXPERIENCES")
    ) {
      toggle();
    } else {
      props.chosenAppointment(
        convertedHour,
        coiffeurs,
        offerToReducer,
        offerPriceToReducer,
        offerDurationToReducer,
        experienceToReducer,
        experiencePriceToReducer,
        experienceDurationToReducer,
        date === null ? chosenVar : chosenVar,
        props.shopDetails.shopName,
        props.shopDetails.shopAddress,
        props.shopDetails._id,
        props.shopDetails.shopImages[0]
      );

      if (props.token === "") {
        history.push("/SignScreen", { from: "ShopScreen" });
      } else {
        history.push("/AppointmentScreen", { from: "ShopScreen" });
      }
    }
  }

  return (
    <div style={{ backgroundColor: "#FFE082" }}>
      <Header />
      <Container>
        <Row>
          <Col xs={{ size: 10, offset: 1 }} sm={{ size: 8, offset: 2 }}>
            <div>
              <Card>
                <CardBody className="d-flex flex-column">
                  <ShopCarousel shopDetails={props.shopDetails} />
                  <Row>
                    <Col xs={{ size: 12 }} md={{ size: 6 }}>
                      <CardTitle tag="h2">
                        {props.shopDetails.shopName}
                      </CardTitle>
                    </Col>
                    <Col xs={2} md={{ size: 1, offset: 5 }}>
                      <FontAwesomeIcon
                        onClick={() => handleFavorite()}
                        icon={faHeart}
                        size={36}
                        color={favColor}
                      />
                    </Col>
                  </Row>
                  <h6 style={{ color: "green" }}>{errorFavorite}</h6>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {props.shopDetails.shopAddress}
                  </CardSubtitle>
                  <CardTitle tag="h5">Description :</CardTitle>
                  <CardText>{props.shopDetails.shopDescription}</CardText>
                  <CardTitle tag="h5">Détail des services :</CardTitle>
                  <ShopStars shopDetails={props.shopDetails} />
                  <ShopPrice shopDetails={props.shopDetails} />
                  <ShopPicto shopDetails={props.shopDetails} />
                  <CardTitle tag="h5">Votre réservation :</CardTitle>
                  <ShopInputSelect
                    shopDetails={props.shopDetails}
                    coiffeurs={coiffeurs}
                    setCoiffeurs={setCoiffeurs}
                    offer={offer}
                    setOffer={setOffer}
                    experience={experience}
                    setExperience={setExperience}
                  />
                  <HoursTab
                    chosenCompleteDate={props.chosenCompleteDate}
                    chosenDate={props.chosenDate}
                    date={date}
                    startDate={startDate}
                    setDate={setDate}
                    chosenVar={chosenVar}
                    setChosenVar={setChosenVar}
                    chosenHour={chosenHour}
                    setChosenHour={setChosenHour}
                    shopDetails={props.shopDetails}
                  />

                  <CardText>
                    <Button
                      style={{ backgroundColor: "#4280AB" }}
                      onClick={() => validationChoice()}
                    >
                      Prendre rendez-vous
                    </Button>
                  </CardText>
                  <CardTitle tag="h5">Tous les avis :</CardTitle>

                  <ListComment comments={props.shopDetails.comments} />

                  <CardTitle tag="h5">Nous trouver :</CardTitle>
                  <CardText>
                    <ShopMapContainer shopDetails={props.shopDetails} />
                  </CardText>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalAlertChoice modal={modal} toggle={toggle} />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    chosenAppointment: function (
      hour,
      coiffeurs,
      quoi,
      price,
      duration,
      experience,
      experiencePrice,
      experienceDuration,
      date,
      shopDetailsName,
      shopDetailsAddress,
      shopDetailsID,
      shopDetailsImage
    ) {
      dispatch({
        type: "finalAppointment",
        hour: hour,
        hairdresser: coiffeurs,
        prestation: quoi,
        prestationPrice: price,
        prestationDuration: duration,
        experience: experience,
        experiencePrice: experiencePrice,
        experienceDuration: experienceDuration,
        date: date,
        shopDetailsName: shopDetailsName,
        shopDetailsAddress: shopDetailsAddress,
        shopDetailsID: shopDetailsID,
        shopDetailsImage: shopDetailsImage,
      });
    },

    favoriteShops: function (shopID) {
      dispatch({
        type: "favoriteShop",
        shopID: shopID,
      });
    },
  };
}

function mapStateToProps(state) {
  return {
    shopDetails: state.shopDetails,
    chosenDate: state.search.date,
    chosenCompleteDate: state.search.completeDate,
    search: state.search,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopScreen);
