import React from "react";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  FormGroup,
  Label,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faClock,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HomeSearchForm({
  startDate,
  date,
  hour,
  isDateSelected,
  isTimeSelected,
  errorMessage,
  offer,
  setDate,
  setHour,
  setIsDateSelected,
  setIsTimeSelected,
  setErrorMessage,
  setOffer,
  citySearch,
  city,
  cityVisible,
  setCitySearch,
  setCity,
  setCityVisible,
  setCityCoordinates,
  validationButton,
}) {
  // Addresses AutoComplete

  let cityList = [];

  const onChangeCity = async (arg) => {
    setCitySearch(arg);
    setCityVisible(true);

    if (citySearch != null && citySearch.length > 2) {
      var rawResponse = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${citySearch}&autocomplete=1`
      );
      var response = await rawResponse.json();
      cityList = response.features.map((e) => ({
        label: e.properties.label,
        latitude: e.geometry.coordinates[1],
        longitude: e.geometry.coordinates[0],
      }));
      setCity(cityList);
    }
  };

  return (
    <div className="homeScreenForm">
      <h1 style={{ marginBottom: 26 }}>
        Découvrez et réserver un salon de coiffure !
      </h1>

      <InputGroup>
        <InputGroupText>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroupText>
        <Input
          type="text"
          placeholder="Toutes les villes"
          className="inputSignUp"
          value={citySearch}
          onChange={(e) => {
            setErrorMessage("");
            onChangeCity(e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup>
        <div style={{ color: "red" }}>{errorMessage}</div>
        {cityVisible
          ? city.map((e, key) => {
              return (
                <Col
                  className="border border-dark"
                  style={{ backgroundColor: "white" }}
                  xs={12}
                  onClick={() => {
                    setCitySearch(e.label);
                    setCityCoordinates({
                      latitude: e.latitude,
                      longitude: e.longitude,
                    });
                    setCityVisible(false);
                  }}
                >
                  <p className="cityText" key={key}>
                    {e.label}
                  </p>
                </Col>
              );
            })
          : null}
      </InputGroup>
      <InputGroup className="mb-3 mt-3">
        <InputGroupText>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </InputGroupText>
        {isDateSelected ? (
          <DatePicker
            startDate={startDate}
            minDate={startDate}
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="fr"
          />
        ) : (
          <DatePicker
            startDate={startDate}
            minDate={startDate}
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="fr"
            disabled
          />
        )}
        <FormGroup check className="ml-4">
          <Label check>
            <Input
              type="checkbox"
              onChange={() => setIsDateSelected(!isDateSelected)}
            />{" "}
            Toutes les dates
          </Label>
        </FormGroup>
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroupText>
          <FontAwesomeIcon icon={faClock} />
        </InputGroupText>
        {isTimeSelected ? (
          <DatePicker
            selected={hour}
            onChange={(hour) => setHour(hour)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH'h'mm"
            locale="fr-FR"
          />
        ) : (
          <DatePicker
            selected={hour}
            onChange={(hour) => setHour(hour)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH'h'mm"
            locale="fr-FR"
            disabled
          />
        )}
        <FormGroup check className="ml-4">
          <Label check>
            <Input
              type="checkbox"
              onChange={() => setIsTimeSelected(!isTimeSelected)}
            />{" "}
            Toutes les heures
          </Label>
        </FormGroup>
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroupText>
          <FontAwesomeIcon icon={faList} />
        </InputGroupText>
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          onChange={(event) => setOffer(event.target.value)}
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
      <Button
        style={{ backgroundColor: "#4280AB" }}
        onClick={() => validationButton(offer)}
      >
        Valider
      </Button>
    </div>
  );
}
