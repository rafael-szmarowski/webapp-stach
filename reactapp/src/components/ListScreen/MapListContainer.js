import React, { useEffect, useRef } from "react";
import { Button } from "reactstrap";

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
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

//https://github.com/PaulLeCam/react-leaflet/issues/796
const Centerer = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

export default function MapListContainer({
  position,
  shopsData,
  choiceValidation,
}) {
  const mapRef = useRef();
  return (
    <div>
      <MapContainer ref={mapRef} zoom={13} scrollWheelZoom={false}>
        <Centerer center={position} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {shopsData.length > 0
          ? shopsData.map((element) => {
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

              return (
                <Marker position={[element.latitude, element.longitude]}>
                  <Popup>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <img
                            src={element.shopImages[0]}
                            alt={`salon ${element.shopImages}`}
                            width="96"
                            height="65"
                          ></img>
                        </div>
                        <div style={{ padding: 10 }}>
                          {" "}
                          {starsTab} <br /> {priceTab} <br /> {pictoTab}
                        </div>
                      </div>
                      <div>
                        <h4>{element.shopName}</h4>
                        <div> {element.shopAddress}</div>
                        <Button
                          onClick={() => {
                            choiceValidation(element);
                          }}
                          style={{ backgroundColor: "#4280AB" }}
                        >
                          Choisir ce salon
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })
          : null}
      </MapContainer>
    </div>
  );
}
