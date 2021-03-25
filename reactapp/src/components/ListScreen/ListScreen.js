import React, { useState, useEffect } from "react";
import { Button, Col, Row, Container } from "reactstrap";

import Header from "../Header";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ModalFilter from "./ModalFilter";
import ListCards from "./ListCards";
import MapListContainer from "./MapListContainer";

//https://github.com/PaulLeCam/react-leaflet/issues/796

function ListScreen(props) {
  const [position, setPosition] = useState([48.856614, 2.3522219]);
  const [shopsData, setShopsData] = useState([]);
  const [orderPriceSort, setOrderPriceSort] = useState(true);
  const [orderServicesSort, setOrderServicesSort] = useState(true);
  const [cardIsFocused, setCardIsFocused] = useState("");

  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const toggle = () => setModal(!modal);

  // useEffect to fetch datas whenever search reducer changes
  useEffect(() => {
    async function getShops() {
      setLoading(true);
      let shopsFetch = await fetch(`/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: props.search }),
      });
      let body = await shopsFetch.json();

      setShopsData(body.filteredDistanceShopsList);
      setLoading(false);
    }

    getShops();
  }, [props.search]);

  function sortByPrice() {
    setOrderPriceSort(!orderPriceSort);
    var shopListCopy = [...shopsData];
    let sortByPrice
    if (orderPriceSort === false) {
      sortByPrice = shopListCopy.sort((a, b) => {
        if (a.priceFork < b.priceFork) {
          return -1;
        }
        if (a.priceFork > b.priceFork) {
          return 1;
        }
        return 0;
      });
    } else {
      sortByPrice = shopListCopy.sort((a, b) => {
        if (a.priceFork > b.priceFork) {
          return -1;
        }
        if (a.priceFork < b.priceFork) {
          return 1;
        }
        return 0;
      });
    }
    setShopsData(sortByPrice);
  }

  function sortByNote() {
    setOrderServicesSort(!orderServicesSort);
    var shopListCopy = [...shopsData];
    let sortByNote
    if (orderServicesSort === false) {
      sortByNote = shopListCopy.sort((a, b) => {
        if (a.rating < b.rating) {
          return -1;
        }
        if (a.rating > b.rating) {
          return 1;
        }
        return 0;
      });
    } else {
      sortByNote = shopListCopy.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return 1;
        }
        return 0;
      });
    }
    setShopsData(sortByNote);
  }

  // Hover function to change card's border and map position
  function cardHover(name, latitude, longitude) {
    setPosition([latitude, longitude]);
    setCardIsFocused(name);
  }

  // function choice of hairdresser
  function choiceValidation(shopDetails) {
    props.saveChosenOffer(shopDetails);
    history.push("/ShopScreen", { from: "ListScreen" });
  }

  return (
    <div className="containerHomeScreen">
      <Header />
      <div style={{ marginTop: 10 }}>
        <Container>
          <Row>
            <Col xs={12} md={6} className="button-col">
              <Button
                style={{ backgroundColor: "#FFCD41" }}
                onClick={() => toggle()}
              >
                Filtrer
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={{ size: "auto", offset: 1 }} className="button-col">
              <Button
                style={{ backgroundColor: "#4280AB" }}
                onClick={() => sortByPrice()}
              >
                Trier Par Prix
              </Button>
            </Col>
            <Col xs={6} md={{ size: "auto", offset: 1 }} className="button-col">
              <Button
                style={{ backgroundColor: "#4280AB" }}
                onClick={() => sortByNote()}
              >
                Trier Par Note
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} className="mb-4">
              <ListCards
                position={position}
                setPosition={setPosition}
                shopsData={shopsData}
                setShopsData={setShopsData}
                orderPriceSort={orderPriceSort}
                setOrderPriceSort={setOrderPriceSort}
                orderServicesSort={orderServicesSort}
                setOrderServicesSort={setOrderServicesSort}
                loading={loading}
                setLoading={setLoading}
                cardIsFocused={cardIsFocused}
                setCardIsFocused={setCardIsFocused}
                cardHover={cardHover}
                choiceValidation={choiceValidation}
              />
            </Col>
            <Col xs={12} md={6} className="mb-4">
              <MapListContainer
                position={position}
                shopsData={shopsData}
                choiceValidation={choiceValidation}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <ModalFilter modal={modal} setModal={setModal} toggle={toggle} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
