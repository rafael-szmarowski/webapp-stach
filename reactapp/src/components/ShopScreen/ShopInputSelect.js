import React from "react";

import { CardText, Col, Row, Input } from "reactstrap";

export default function ShopInputSelect({
  shopDetails,
  setCoiffeurs,
  offer,
  setOffer,
  experience,
  setExperience,
}) {
  // hairdresser choice
  const coiffeurTab = shopDetails.shopEmployees.map((choix) => {
    return <option>{choix}</option>;
  });

  // offer choice

  const offerTab = shopDetails.offers.map((choix) => {
    return (
      <option>
        {choix.type} - {choix.price}€
      </option>
    );
  });

  // experience choice

  const experienceTab = shopDetails.packages.map((choix) => {
    return (
      <option>
        {choix.type} - {choix.price}€
      </option>
    );
  });

  return (
    <CardText>
      Choix du détail du rendez-vous :
      <Row>
        <Col xs={12} md={4} className="mb-4 mt-4">
          <Input
            type="select"
            name="selectCoiffeurs"
            id="Select"
            onChange={(event) => setCoiffeurs(event.target.value)}
          >
            <option>Tous les professionnels</option>
            {coiffeurTab}
          </Input>
        </Col>
        <Col xs={12} md={4} className="mb-4 mt-4">
          <Input
            type="select"
            name="selectOffers"
            id="exampleSelect"
            value={offer}
            onChange={(event) => {
              setExperience("TOUTES LES EXPERIENCES");
              setOffer(event.target.value);
            }}
          >
            <option>TOUTES LES PRESTATIONS</option>
            {offerTab}
          </Input>
        </Col>
        <Col xs={12} md={4} className="mb-4 mt-4">
          <Input
            type="select"
            name="selectExperience"
            id="examlect"
            value={experience}
            onChange={(event) => {
              setOffer("TOUTES LES PRESTATIONS");
              setExperience(event.target.value);
            }}
          >
            <option>TOUTES LES EXPERIENCES</option>
            {experienceTab}
          </Input>
        </Col>
      </Row>
    </CardText>
  );
}
