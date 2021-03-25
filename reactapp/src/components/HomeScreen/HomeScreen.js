import React, { useState } from "react";
import { Col, Row, Container } from "reactstrap";

import Header from "../Header";
import { connect } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

import { useHistory } from "react-router-dom";
import HomeSearchForm from "./HomeSearchForm";
import HomeCarousel from "./HomeCarousel";

function HomeScreen(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());

  const [isDateSelected, setIsDateSelected] = useState(true);
  const [isTimeSelected, setIsTimeSelected] = useState(true);

  const [selectType, setSelectType] = useState("salon");

  const [errorMessage, setErrorMessage] = useState("");

  const [offer, setOffer] = useState("TOUTES LES PRESTATIONS");

  const service = null;
  const priceFork = null;
  const rating = null;

  // Addresses AutoComplete
  const [citySearch, setCitySearch] = useState(null);
  const [city, setCity] = useState([]);
  const [cityVisible, setCityVisible] = useState(false);
  const [cityCoordinates, setCityCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  let history = useHistory();

  // Validation button
  function validationButton(choice) {
    if (citySearch != null && cityCoordinates.latitude === null) {
      setErrorMessage("Veuillez resaisir votre addresse");
    } else {
      setErrorMessage("");

      let dateToReducer = null;
      var zeroDay = "";
      var zeroMonth = "";
      if (date.getDate() < 10) {
        zeroDay = "0";
      }
      if (date.getMonth() < 10) {
        zeroMonth = "0";
      }
      if (isDateSelected) {
        dateToReducer =
          zeroDay +
          date.getDate() +
          "-" +
          zeroMonth +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();
      }

      let timeToReducer = null;
      var zeroHour = "";
      var zeroMinute = "";
      if (hour.getHours() < 11) {
        zeroHour = "0";
      }
      if (hour.getMinutes() < 10) {
        zeroMinute = "0";
      }
      if (isTimeSelected) {
        timeToReducer =
          "" +
          zeroHour +
          hour.getHours() +
          ":" +
          zeroMinute +
          hour.getMinutes();
      }

      let completeDateToReducer = null;

      if (isDateSelected === true && isTimeSelected === true) {
        completeDateToReducer = new Date(
          `${date.getFullYear()}`,
          `${date.getMonth()}`,
          `${date.getDate()}`,
          `${hour.getHours()}`,
          `${hour.getMinutes()}`
        );
      }

      let serviceToReducer = null;
      let experienceToReducer = null;

      if (
        choice === "COUPE HOMME" ||
        choice === "COUPE FEMME" ||
        choice === "COUPE HOMME + BARBE" ||
        choice === "COUPE HOMME COLORATION" ||
        choice === "COUPE FEMME COLORATION" ||
        choice === "COUPE FEMME AFRO" ||
        choice === "COUPE HOMME AFRO" ||
        choice === "COUPE FEMME BALAYAGE" ||
        choice === "COUPE FEMME PERMANENTE"
      ) {
        serviceToReducer = choice;
      } else if (
        choice === "MOMENT A DEUX" ||
        choice === "APERO COIF" ||
        choice === "PLAY HARD CUT HARD" ||
        choice === "BIEN ETRE"
      ) {
        experienceToReducer = choice;
      }

      props.onSubmitSearch(
        selectType,
        completeDateToReducer,
        dateToReducer,
        timeToReducer,
        citySearch,
        cityCoordinates.latitude,
        cityCoordinates.longitude,
        serviceToReducer,
        experienceToReducer,
        service,
        priceFork,
        rating
      );
      history.push("/ListScreen", { from: "HomeScreen" });
    }
  }

  return (
    <div className="containerHomeScreen">
      <Header />
      <div style={{ marginTop: 80 }}>
        <Container>
          <Row>
            <Col xs={12} md={6} className="mb-4">
              <HomeSearchForm
                startDate={startDate}
                date={date}
                hour={hour}
                isDateSelected={isDateSelected}
                isTimeSelected={isTimeSelected}
                selectType={selectType}
                errorMessage={errorMessage}
                offer={offer}
                setStartDate={setStartDate}
                setDate={setDate}
                setHour={setHour}
                setIsDateSelected={setIsDateSelected}
                setIsTimeSelected={setIsTimeSelected}
                setSelectType={setSelectType}
                setErrorMessage={setErrorMessage}
                setOffer={setOffer}
                citySearch={citySearch}
                city={city}
                cityVisible={cityVisible}
                cityCoordinates={cityCoordinates}
                setCitySearch={setCitySearch}
                setCity={setCity}
                setCityVisible={setCityVisible}
                setCityCoordinates={setCityCoordinates}
                validationButton={validationButton}
              />
            </Col>
            <Col xs={12} md={6}>
              <HomeCarousel validationButton={validationButton} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
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
  return { search: state.search};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
