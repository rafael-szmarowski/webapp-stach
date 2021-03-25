import React from "react";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Table,
  Spinner,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
  faStar,
  faWheelchair,
  faGlassMartini,
  faGamepad,
  faPaw,
  faCoffee,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

function NoResult() {
  return (
    <h5 style={{ color: "red" }}>
      Pas de salons disponibles veuillez refaire votre recherche
    </h5>
  );
}

export default function ListCards({
  shopsData,
  loading,
  cardIsFocused,
  cardHover,
  choiceValidation,
}) {
  return (
    <Card>
      <CardBody>
        <div
          style={{
            maxHeight: "560px",
            overflowY: "auto",
          }}
        >
          <Table bordered height="560">
            <thead>
              <tr>
                {!loading ? (
                  shopsData.length > 0 ? (
                    shopsData.map((element) => {
                      var priceTab = [];
                      for (let y = 0; y < 3; y++) {
                        let color = "white";
                        if (y < element.priceFork) {
                          color = "black";
                        }
                        priceTab.push(
                          <FontAwesomeIcon
                            key={y}
                            icon={faEuroSign}
                            size={15}
                            color={color}
                            style={{ padding: 2 }}
                          />
                        );
                      }

                      var pictoTab = [];
                      for (let z = 0; z < element.shopFeatures.length; z++) {
                        let pictoIcon = null;
                        if (element.shopFeatures[z] === "wheelchair-alt") {
                          pictoIcon = faWheelchair;
                        } else if (element.shopFeatures[z] === "glass") {
                          pictoIcon = faGlassMartini;
                        } else if (element.shopFeatures[z] === "gamepad") {
                          pictoIcon = faGamepad;
                        } else if (element.shopFeatures[z] === "coffee") {
                          pictoIcon = faCoffee;
                        } else if (element.shopFeatures[z] === "paw") {
                          pictoIcon = faPaw;
                        } else if (element.shopFeatures[z] === "leaf") {
                          pictoIcon = faLeaf;
                        }
                        pictoTab.push(
                          <FontAwesomeIcon
                            key={z}
                            icon={pictoIcon}
                            size={15}
                            color="black"
                            style={{ padding: 2 }}
                          />
                        );
                      }

                      var starsTab = [];
                      var flooredStarRating = Math.round(element.rating);
                      for (let j = 0; j < 5; j++) {
                        let color = "black";
                        if (j < flooredStarRating) {
                          color = "gold";
                        }
                        starsTab.push(
                          <FontAwesomeIcon
                            key={j}
                            style={{ marginRight: 5 }}
                            icon={faStar}
                            size={24}
                            color={color}
                          />
                        );
                      }
                      let focusColor;
                      if (element.shopName === cardIsFocused) {
                        focusColor = "#4280AB";
                      } else {
                        focusColor = null;
                      }

                      return (
                        <Card
                          className="mb-2"
                          style={{
                            borderColor: focusColor,
                            display: "flex",
                            flexDirection: "row",
                          }}
                          onMouseEnter={() => {
                            cardHover(
                              element.shopName,
                              element.latitude,
                              element.longitude
                            );
                          }}
                        >
                          <CardImg
                            top
                            src={element.shopImages[0]}
                            alt="Card image cap"
                            style={{
                              width: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <CardBody>
                            <CardTitle tag="h5">{element.shopName}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">
                              {element.shopAddress}
                            </CardSubtitle>
                            <CardText>
                              <div>
                                <div>{starsTab}</div>
                                <div>{priceTab}</div>
                                <div>{pictoTab}</div>
                              </div>
                            </CardText>
                            <CardText></CardText>

                            <Button
                              onClick={() => {
                                choiceValidation(element);
                              }}
                              style={{ backgroundColor: "#4280AB" }}
                            >
                              Choisir ce salon
                            </Button>
                          </CardBody>
                        </Card>
                      );
                    })
                  ) : (
                    <NoResult />
                  )
                ) : (
                  <Spinner color="primary" />
                )}
              </tr>
            </thead>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
